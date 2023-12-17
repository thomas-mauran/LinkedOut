package com.linkedout.profile.function.profile

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.profile.service.ProfileService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Profile.RequestUserProfileDeletionResponse
import org.springframework.stereotype.Component
import java.util.*
import java.util.function.Function

@Component
class RequestProfileDeletionOfUser(private val profileService: ProfileService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Extract the request
        val request = t.requestUserProfileDeletionRequest
        val userId = UUID.fromString(request.userId)

        // Mark the profile as pending deletion
        profileService.requestDeletionOfUser(userId).block()

        return RequestResponseFactory.newSuccessfulResponse()
            .setRequestUserProfileDeletionResponse(RequestUserProfileDeletionResponse.getDefaultInstance())
            .build()
    }
}
