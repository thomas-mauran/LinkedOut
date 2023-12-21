package com.linkedout.profile.function.availability

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.profile.converter.availability.AvailabilityToProto
import com.linkedout.profile.service.AvailabilityService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Profile.GetUserAvailabilitiesResponse
import org.springframework.stereotype.Component
import java.util.UUID
import java.util.function.Function

@Component
class GetAvailabilitiesOfUser(private val availabilityService: AvailabilityService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Extract the request
        val request = t.getUserAvailabilitiesRequest
        val userId = UUID.fromString(request.userId)

        // Get the availabilities from the database
        val reactiveResponse = availabilityService.findByUserId(userId)
            .map { availability ->
                AvailabilityToProto().convert(availability)
            }.reduce(GetUserAvailabilitiesResponse.newBuilder()) { builder, availability ->
                builder.addAvailabilities(availability)
                builder
            }
            .map { builder ->
                builder.build()
            }

        // Block until the response is ready
        val response = reactiveResponse.block()
            ?: return RequestResponseFactory.newSuccessfulResponse()
                .setGetUserAvailabilitiesResponse(GetUserAvailabilitiesResponse.getDefaultInstance())
                .build()

        return RequestResponseFactory.newSuccessfulResponse()
            .setGetUserAvailabilitiesResponse(response)
            .build()
    }
}
