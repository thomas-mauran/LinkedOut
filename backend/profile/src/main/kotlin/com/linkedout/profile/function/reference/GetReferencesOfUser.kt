package com.linkedout.profile.function.reference

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.profile.converter.reference.ReferenceToProto
import com.linkedout.profile.service.ReferenceService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Profile.GetUserReferencesResponse
import org.springframework.stereotype.Component
import java.util.UUID
import java.util.function.Function

@Component
class GetReferencesOfUser(private val referenceService: ReferenceService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Extract the request
        val request = t.getUserReferencesRequest
        val userId = UUID.fromString(request.userId)

        // Get the references from the database
        val reactiveResponse = referenceService.findByUserId(userId)
            .map { reference ->
                ReferenceToProto().convert(reference)
            }
            .reduce(GetUserReferencesResponse.newBuilder()) { builder, reference ->
                builder.addReferences(reference)
                builder
            }
            .map { builder ->
                builder.build()
            }

        // Block until the response is ready
        val response = reactiveResponse.block()
            ?: return RequestResponseFactory.newSuccessfulResponse()
                .setGetUserReferencesResponse(GetUserReferencesResponse.getDefaultInstance())
                .build()

        return RequestResponseFactory.newSuccessfulResponse()
            .setGetUserReferencesResponse(response)
            .build()
    }
}
