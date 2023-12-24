package com.linkedout.profile.function.availability

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.profile.converter.availability.AvailabilityToProto
import com.linkedout.profile.converter.availability.CreateAvailabilityDtoFromProto
import com.linkedout.profile.service.AvailabilityService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Profile.CreateUserAvailabilityResponse
import org.springframework.stereotype.Component
import java.util.*
import java.util.function.Function

@Component
class CreateAvailabilityOfUser(private val availabilityService: AvailabilityService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Extract the request
        val request = t.createUserAvailabilityRequest
        val userId = UUID.fromString(request.userId)
        val requestDto = CreateAvailabilityDtoFromProto().convert(request.availability)

        // Create the availability
        val reactiveResponse = availabilityService.saveOneOfUser(userId, requestDto)
            .map { availability ->
                AvailabilityToProto().convert(availability)
            }
            .map { availability ->
                CreateUserAvailabilityResponse.newBuilder()
                    .setAvailability(availability)
                    .build()
            }

        // Block until the response is ready
        val response = reactiveResponse.block()

        return RequestResponseFactory.newSuccessfulResponse()
            .setCreateUserAvailabilityResponse(response)
            .build()
    }
}
