package com.linkedout.profile.function.experience

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.profile.converter.experience.ExperienceToProto
import com.linkedout.profile.converter.experience.UpdateExperienceDtoFromProto
import com.linkedout.profile.service.ExperienceService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Profile.UpdateUserExperienceResponse
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
import java.util.*
import java.util.function.Function

@Component
class UpdateExperienceOfUser(private val experienceService: ExperienceService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Extract the request
        val request = t.updateUserExperienceRequest
        val userId = UUID.fromString(request.userId)
        val experienceId = UUID.fromString(request.experienceId)
        val requestDto = UpdateExperienceDtoFromProto().convert(request.experience)

        // Update the experience in the database
        val reactiveResponse = experienceService.updateOneOfUser(userId, experienceId, requestDto)
            .map { experience ->
                ExperienceToProto().convert(experience)
            }
            .map { experience ->
                UpdateUserExperienceResponse.newBuilder()
                    .setExperience(experience)
                    .build()
            }

        // Block until the response is ready
        val response = reactiveResponse.block()
            ?: return RequestResponseFactory.newFailedResponse("Experience not found", HttpStatus.NOT_FOUND).build()

        return RequestResponseFactory.newSuccessfulResponse()
            .setUpdateUserExperienceResponse(response)
            .build()
    }
}
