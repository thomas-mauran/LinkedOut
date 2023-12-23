package com.linkedout.profile.function.experience

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.profile.converter.experience.CreateExperienceDtoFromProto
import com.linkedout.profile.converter.experience.ExperienceToProto
import com.linkedout.profile.service.ExperienceService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Profile.CreateUserExperienceResponse
import org.springframework.stereotype.Component
import java.util.*
import java.util.function.Function

@Component
class CreateExperienceOfUser(private val experienceService: ExperienceService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Extract the request
        val request = t.createUserExperienceRequest
        val userId = UUID.fromString(request.userId)
        val requestDto = CreateExperienceDtoFromProto().convert(request.experience)

        // Create the experience
        val reactiveResponse = experienceService.saveOneOfUser(userId, requestDto)
            .map { experience ->
                ExperienceToProto().convert(experience)
            }
            .map { experience ->
                CreateUserExperienceResponse.newBuilder()
                    .setExperience(experience)
                    .build()
            }

        // Block until the response is ready
        val response = reactiveResponse.block()

        return RequestResponseFactory.newSuccessfulResponse()
            .setCreateUserExperienceResponse(response)
            .build()
    }
}
