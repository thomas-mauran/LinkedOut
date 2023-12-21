package com.linkedout.profile.function.reference

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.profile.converter.reference.CreateReferenceDtoFromProto
import com.linkedout.profile.converter.reference.ReferenceToProto
import com.linkedout.profile.service.ReferenceService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Profile.CreateUserReferenceResponse
import org.springframework.stereotype.Component
import java.util.*
import java.util.function.Function

@Component
class CreateReferenceOfUser(private val referenceService: ReferenceService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Extract the request
        val request = t.createUserReferenceRequest
        val userId = UUID.fromString(request.userId)
        val requestDto = CreateReferenceDtoFromProto().convert(request.reference)

        // Create the reference
        val reactiveResponse = referenceService.saveOneOfUser(userId, requestDto)
            .map { reference ->
                ReferenceToProto().convert(reference)
            }
            .map { reference ->
                CreateUserReferenceResponse.newBuilder()
                    .setReference(reference)
                    .build()
            }

        // Block until the response is ready
        val response = reactiveResponse.block()

        return RequestResponseFactory.newSuccessfulResponse()
            .setCreateUserReferenceResponse(response)
            .build()
    }
}
