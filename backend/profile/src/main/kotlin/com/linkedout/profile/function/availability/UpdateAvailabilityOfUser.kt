package com.linkedout.profile.function.availability

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.profile.converter.availability.AvailabilityToProto
import com.linkedout.profile.converter.availability.UpdateAvailabilityDtoFromProto
import com.linkedout.profile.service.AvailabilityService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Profile.UpdateUserAvailabilityResponse
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
import java.util.*
import java.util.function.Function

@Component
class UpdateAvailabilityOfUser(private val availabilityService: AvailabilityService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Extract the request
        val request = t.updateUserAvailabilityRequest
        val userId = UUID.fromString(request.userId)
        val availabilityId = UUID.fromString(request.availabilityId)
        val requestDto = UpdateAvailabilityDtoFromProto().convert(request.availability)

        // Update the availability in the database
        val reactiveResponse = availabilityService.updateOneOfUser(userId, availabilityId, requestDto)
            .map { availability ->
                AvailabilityToProto().convert(availability)
            }
            .map { availability ->
                UpdateUserAvailabilityResponse.newBuilder()
                    .setAvailability(availability)
                    .build()
            }

        // Block until the response is ready
        val response = reactiveResponse.block()
            ?: return RequestResponseFactory.newFailedResponse("Availability not found", HttpStatus.NOT_FOUND).build()

        return RequestResponseFactory.newSuccessfulResponse()
            .setUpdateUserAvailabilityResponse(response)
            .build()
    }
}
