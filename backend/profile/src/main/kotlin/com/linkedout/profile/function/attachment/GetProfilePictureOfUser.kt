package com.linkedout.profile.function.attachment

import com.google.protobuf.ByteString
import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.profile.service.AttachmentService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Profile
import org.springframework.stereotype.Component
import java.util.*
import java.util.function.Function

@Component
class GetProfilePictureOfUser(private val attachmentService: AttachmentService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Extract the request
        val request = t.getUserProfilePictureRequest
        val userId = UUID.fromString(request.userId)

        // Download the profile picture
        val profilePicture = attachmentService.findProfilePictureOfUser(userId)

        return RequestResponseFactory.newSuccessfulResponse()
            .setGetUserProfilePictureResponse(
                Profile.GetUserProfilePictureResponse.newBuilder()
                    .setPicture(ByteString.copyFrom(profilePicture))
                    .build()
            )
            .build()
    }
}
