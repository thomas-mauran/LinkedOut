package com.linkedout.profile.function.availability

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.profile.dto.availability.CreateAvailabilityDto
import com.linkedout.profile.service.AvailabilityService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.models.AddressOuterClass
import com.linkedout.proto.models.AvailabilityOuterClass
import com.linkedout.proto.services.Profile.CreateUserAvailabilityResponse
import org.springframework.stereotype.Component
import java.time.LocalDate
import java.time.LocalTime
import java.time.ZoneOffset
import java.util.*
import java.util.function.Function

@Component
class CreateAvailabilityOfUser(private val availabilityService: AvailabilityService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Extract the request
        val request = t.createUserAvailabilityRequest
        val userId = UUID.fromString(request.userId)
        val dto = CreateAvailabilityDto(
            LocalDate.ofEpochDay(request.availability.startDate),
            LocalDate.ofEpochDay(request.availability.endDate),
            request.availability.address.firstLine,
            request.availability.address.zipCode,
            request.availability.address.city,
            request.availability.range,
            UUID.fromString(request.availability.jobCategoryId)
        )

        // Get the companies from the database
        val reactiveResponse = availabilityService.saveOneOfUser(userId, dto)
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
