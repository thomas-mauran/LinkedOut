package com.linkedout.profile.function.profile

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.profile.service.ProfileService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Profile
import org.springframework.stereotype.Component
import java.util.*
import java.util.function.Function

@Component
class DeleteProfile(private val profileService: ProfileService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Extract the request
        val request = t.deleteProfileRequest
        val profileId = UUID.fromString(request.id)

        // Delete the profile
        profileService.deleteOne(profileId).block()

        return RequestResponseFactory.newSuccessfulResponse()
            .setDeleteProfileResponse(Profile.DeleteProfileResponse.getDefaultInstance())
            .build()
    }
}
