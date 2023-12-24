package com.linkedout.profile.function.experience

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.profile.converter.experience.ExperienceToProto
import com.linkedout.profile.service.ExperienceService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Profile.GetUserExperienceResponse
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
import java.util.*
import java.util.function.Function

@Component
class GetExperienceOfUser(private val experienceService: ExperienceService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Extract the request
        val request = t.getUserExperienceRequest
        val userId = UUID.fromString(request.userId)
        val experienceId = UUID.fromString(request.experienceId)

        // Get the experience from the database
        val reactiveResponse = experienceService.findByUserIdAndExperienceId(userId, experienceId)
            .map { experience ->
                ExperienceToProto().convert(experience)
            }
            .map { experience ->
                GetUserExperienceResponse.newBuilder()
                    .setExperience(experience)
                    .build()
            }

        // Block until the response is ready
        val response = reactiveResponse.block()
            ?: return RequestResponseFactory.newFailedResponse("Experience not found", HttpStatus.NOT_FOUND).build()

        return RequestResponseFactory.newSuccessfulResponse()
            .setGetUserExperienceResponse(response)
            .build()
    }
}
