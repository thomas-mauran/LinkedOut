package com.linkedout.profile.function.availability

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.profile.dto.availability.UpdateAvailabilityDto
import com.linkedout.profile.service.AvailabilityService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.models.AddressOuterClass
import com.linkedout.proto.models.AvailabilityOuterClass
import com.linkedout.proto.services.Profile.UpdateUserAvailabilityResponse
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
import java.time.LocalDate
import java.time.LocalTime
import java.time.ZoneOffset
import java.util.*
import java.util.function.Function

@Component
class UpdateAvailabilityOfUser(private val availabilityService: AvailabilityService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Extract the request
        val request = t.updateUserAvailabilityRequest
        val userId = UUID.fromString(request.userId)
        val availabilityId = UUID.fromString(request.availabilityId)
        val requestAvailability = request.availability

        val updatedAvailability = UpdateAvailabilityDto(
            if (requestAvailability.hasStartDate()) LocalDate.ofEpochDay(requestAvailability.startDate) else null,
            if (requestAvailability.hasEndDate()) LocalDate.ofEpochDay(requestAvailability.endDate) else null,
            if (requestAvailability.hasAddressFirstLine()) requestAvailability.addressFirstLine else null,
            if (requestAvailability.hasAddressZip()) requestAvailability.addressZip else null,
            if (requestAvailability.hasAddressCity()) requestAvailability.addressCity else null,
            if (requestAvailability.hasRange()) requestAvailability.range else null,
            if (requestAvailability.hasJobCategoryId()) UUID.fromString(requestAvailability.jobCategoryId) else null
        )

        // Update the availability in the database
        val reactiveResponse = availabilityService.updateOneOfUser(userId, availabilityId, updatedAvailability)
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
