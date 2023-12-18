package com.linkedout.profile.function.profile

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.profile.converter.profile.ProfileToProto
import com.linkedout.profile.service.ProfileService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Profile.GetProfilesRequestingDeletionResponse
import org.springframework.stereotype.Component
import java.util.function.Function

@Component
class GetProfilesRequestingDeletion(private val profileService: ProfileService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Get the companies from the database
        val reactiveResponse = profileService.findAllPendingDeletion()
            .map { profile ->
                ProfileToProto().convert(profile)
            }.reduce(GetProfilesRequestingDeletionResponse.newBuilder()) { builder, profile ->
                builder.addProfiles(profile)
                builder
            }
            .map { builder ->
                builder.build()
            }

        // Block until the response is ready
        val response = reactiveResponse.block()
            ?: return RequestResponseFactory.newSuccessfulResponse()
                .setGetProfilesRequestingDeletionResponse(GetProfilesRequestingDeletionResponse.getDefaultInstance())
                .build()

        return RequestResponseFactory.newSuccessfulResponse()
            .setGetProfilesRequestingDeletionResponse(response)
            .build()
    }
}
