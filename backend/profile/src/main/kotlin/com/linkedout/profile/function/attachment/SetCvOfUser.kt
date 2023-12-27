package com.linkedout.profile.function.attachment

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
class SetCvOfUser(private val attachmentService: AttachmentService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Extract the request
        val request = t.setUserCvRequest
        val userId = UUID.fromString(request.userId)
        val cv = request.cv.toByteArray()

        // Upload the CV
        attachmentService.setCvOfUser(userId, cv)

        return RequestResponseFactory.newSuccessfulResponse()
            .setSetUserCvResponse(Profile.SetUserCvResponse.getDefaultInstance())
            .build()
    }
}
