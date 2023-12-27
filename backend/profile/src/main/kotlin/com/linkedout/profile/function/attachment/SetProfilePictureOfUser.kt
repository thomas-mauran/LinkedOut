package com.linkedout.profile.function.attachment

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.profile.service.AttachmentService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Profile
import org.springframework.stereotype.Component
import java.util.UUID
import java.util.function.Function

@Component
class SetProfilePictureOfUser(private val attachmentService: AttachmentService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Extract the request
        val request = t.setUserProfilePictureRequest
        val userId = UUID.fromString(request.userId)
        val profilePicture = request.picture.toByteArray()

        // Upload the profile picture
        attachmentService.setProfilePictureOfUser(userId, profilePicture)

        return RequestResponseFactory.newSuccessfulResponse()
            .setSetUserProfilePictureResponse(Profile.SetUserProfilePictureResponse.getDefaultInstance())
            .build()
    }
}
