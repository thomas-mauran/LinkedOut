package com.linkedout.profile.function.reference

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.profile.service.ReferenceService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Profile.DeleteUserReferenceResponse
import org.springframework.stereotype.Component
import java.util.*
import java.util.function.Function

@Component
class DeleteReferenceOfUser(private val referenceService: ReferenceService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Extract the request
        val request = t.deleteUserReferenceRequest
        val userId = UUID.fromString(request.userId)
        val referenceId = UUID.fromString(request.referenceId)

        // Delete the reference
        referenceService.deleteByUserIdAndReferenceId(userId, referenceId).block()

        return RequestResponseFactory.newSuccessfulResponse()
            .setDeleteUserReferenceResponse(DeleteUserReferenceResponse.getDefaultInstance())
            .build()
    }
}
