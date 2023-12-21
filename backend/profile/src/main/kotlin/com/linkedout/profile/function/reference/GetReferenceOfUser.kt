package com.linkedout.profile.function.reference

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.profile.converter.reference.ReferenceToProto
import com.linkedout.profile.service.ReferenceService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Profile.GetUserReferenceResponse
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
import java.util.*
import java.util.function.Function

@Component
class GetReferenceOfUser(private val referenceService: ReferenceService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Extract the request
        val request = t.getUserReferenceRequest
        val userId = UUID.fromString(request.userId)
        val referenceId = UUID.fromString(request.referenceId)

        // Get the reference from the database
        val reactiveResponse = referenceService.findByUserIdAndReferenceId(userId, referenceId)
            .map { reference ->
                ReferenceToProto().convert(reference)
            }
            .map { reference ->
                GetUserReferenceResponse.newBuilder()
                    .setReference(reference)
                    .build()
            }

        // Block until the response is ready
        val response = reactiveResponse.block()
            ?: return RequestResponseFactory.newFailedResponse("Reference not found", HttpStatus.NOT_FOUND).build()

        return RequestResponseFactory.newSuccessfulResponse()
            .setGetUserReferenceResponse(response)
            .build()
    }
}
