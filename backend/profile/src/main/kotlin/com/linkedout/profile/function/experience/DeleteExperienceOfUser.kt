package com.linkedout.profile.function.experience

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.profile.service.ExperienceService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Profile
import org.springframework.stereotype.Component
import java.util.*
import java.util.function.Function

@Component
class DeleteExperienceOfUser(private val experienceService: ExperienceService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Extract the request
        val request = t.deleteUserExperienceRequest
        val userId = UUID.fromString(request.userId)
        val experienceId = UUID.fromString(request.experienceId)

        // Delete the experience
        experienceService.deleteByUserIdAndExperienceId(userId, experienceId).block()

        return RequestResponseFactory.newSuccessfulResponse()
            .setDeleteUserExperienceResponse(Profile.DeleteUserExperienceResponse.getDefaultInstance())
            .build()
    }
}
