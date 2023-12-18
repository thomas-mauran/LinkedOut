package com.linkedout.profile.function.availability

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.profile.service.AvailabilityService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.models.AddressOuterClass
import com.linkedout.proto.models.AvailabilityOuterClass
import com.linkedout.proto.services.Profile.GetUserAvailabilityResponse
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
import java.time.LocalTime
import java.time.ZoneOffset
import java.util.*
import java.util.function.Function

@Component
class GetAvailabilityOfUser(private val availabilityService: AvailabilityService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Extract the request
        val request = t.getUserAvailabilityRequest
        val userId = UUID.fromString(request.userId)
        val availabilityId = UUID.fromString(request.availabilityId)

        // Get the availability from the database
        val reactiveResponse = availabilityService.findByUserIdAndAvailabilityId(userId, availabilityId)
            .map { availability ->
                AvailabilityOuterClass.Availability.newBuilder()
                    .setId(availability.id.toString())
                    .setStartDate(availability.startDate.toEpochSecond(LocalTime.MIDNIGHT, ZoneOffset.UTC) * 1000)
                    .setEndDate(availability.endDate.toEpochSecond(LocalTime.MIDNIGHT, ZoneOffset.UTC) * 1000)
                    .setAddress(
                        AddressOuterClass.Address.newBuilder()
                            .setFirstLine(availability.addressFirstLine)
                            .setZipCode(availability.addressZip)
                            .setCity(availability.addressCity)
                    )
                    .setRange(availability.range)
                    .setJobCategoryId(availability.jobCategoryId.toString())
                    .build()
            }
            .map { availability ->
                GetUserAvailabilityResponse.newBuilder()
                    .setAvailability(availability)
                    .build()
            }

        // Block until the response is ready
        val response = reactiveResponse.block()
            ?: return RequestResponseFactory.newFailedResponse("Availability not found", HttpStatus.NOT_FOUND).build()

        return RequestResponseFactory.newSuccessfulResponse()
            .setGetUserAvailabilityResponse(response)
            .build()
    }
}
