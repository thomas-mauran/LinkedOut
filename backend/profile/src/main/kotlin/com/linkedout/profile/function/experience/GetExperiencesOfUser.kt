package com.linkedout.profile.function.experience

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.profile.converter.experience.ExperienceToProto
import com.linkedout.profile.service.ExperienceService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Profile.GetUserExperiencesResponse
import org.springframework.stereotype.Component
import java.util.UUID
import java.util.function.Function

@Component
class GetExperiencesOfUser(private val experienceService: ExperienceService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Extract the request
        val request = t.getUserExperiencesRequest
        val userId = UUID.fromString(request.userId)

        // Get the experiences from the database
        val reactiveResponse = experienceService.findByUserId(userId)
            .map { experience ->
                ExperienceToProto().convert(experience)
            }.reduce(GetUserExperiencesResponse.newBuilder()) { builder, experience ->
                builder.addExperiences(experience)
                builder
            }
            .map { builder ->
                builder.build()
            }

        // Block until the response is ready
        val response = reactiveResponse.block()
            ?: return RequestResponseFactory.newSuccessfulResponse()
                .setGetUserExperiencesResponse(GetUserExperiencesResponse.getDefaultInstance())
                .build()

        return RequestResponseFactory.newSuccessfulResponse()
            .setGetUserExperiencesResponse(response)
            .build()
    }
}
