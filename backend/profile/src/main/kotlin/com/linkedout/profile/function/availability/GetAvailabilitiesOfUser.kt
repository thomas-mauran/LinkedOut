package com.linkedout.profile.function.availability

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.profile.service.AvailabilityService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.models.AddressOuterClass.Address
import com.linkedout.proto.models.AvailabilityOuterClass.Availability
import com.linkedout.proto.services.Profile.GetUserAvailabilitiesResponse
import org.springframework.stereotype.Component
import java.time.LocalTime
import java.time.ZoneOffset
import java.util.UUID
import java.util.function.Function

@Component
class GetAvailabilitiesOfUser(private val availabilityService: AvailabilityService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Extract the request
        val request = t.getUserAvailabilitiesRequest
        val userId = UUID.fromString(request.userId)

        // Get the companies from the database
        val reactiveResponse = availabilityService.findByUserId(userId)
            .map { availability ->
                Availability.newBuilder()
                    .setId(availability.id.toString())
                    .setStartDate(availability.startDate.toEpochSecond(LocalTime.MIDNIGHT, ZoneOffset.UTC) * 1000)
                    .setEndDate(availability.endDate.toEpochSecond(LocalTime.MIDNIGHT, ZoneOffset.UTC) * 1000)
                    .setAddress(
                        Address.newBuilder()
                            .setFirstLine(availability.addressFirstLine)
                            .setZipCode(availability.addressZip)
                            .setCity(availability.addressCity)
                    )
                    .setRange(availability.range)
                    .setJobCategoryId(availability.jobCategoryId.toString())
                    .build()
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
