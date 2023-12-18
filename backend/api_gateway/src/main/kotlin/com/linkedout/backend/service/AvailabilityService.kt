package com.linkedout.backend.service

import com.linkedout.backend.dto.availability.CreateAvailabilityDto
import com.linkedout.backend.dto.availability.UpdateAvailabilityDto
import com.linkedout.backend.model.Address
import com.linkedout.backend.model.Availability
import com.linkedout.backend.model.JobCategory
import com.linkedout.common.service.NatsService
import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.proto.dto.availability.CreateAvailabilityDtoOuterClass
import com.linkedout.proto.dto.availability.UpdateAvailabilityDtoOuterClass
import com.linkedout.proto.models.AddressOuterClass
import com.linkedout.proto.services.Profile
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.time.format.DateTimeFormatter
import java.util.Date

@Service
class AvailabilityService(
    private val natsService: NatsService,
    private val jobCategoryService: JobCategoryService,
    @Value("\${app.services.availability.subjects.createOneOfUser}") private val createOneOfUserSubject: String,
    @Value("\${app.services.availability.subjects.deleteOneOfUser}") private val deleteOneOfUserSubject: String,
    @Value("\${app.services.availability.subjects.findAllOfUser}") private val findAllOfUserSubject: String,
    @Value("\${app.services.availability.subjects.findOneOfUser}") private val findOneOfUserSubject: String,
    @Value("\${app.services.availability.subjects.updateOneOfUser}") private val updateOneOfUserSubject: String
) {
    fun findAllOfUser(requestId: String, userId: String): List<Availability> {
        // Request availabilities from the profile service
        val request = RequestResponseFactory.newRequest(requestId)
            .setGetUserAvailabilitiesRequest(
                Profile.GetUserAvailabilitiesRequest.newBuilder()
                    .setUserId(userId)
            )
            .build()

        val response = natsService.requestWithReply(findAllOfUserSubject, request)

        // Handle the response
        if (!response.hasGetUserAvailabilitiesResponse()) {
            throw Exception("Invalid response")
        }

        val getUserAvailabilitiesResponse = response.getUserAvailabilitiesResponse

        // Get the job categories
        val jobCategoryIds = getUserAvailabilitiesResponse.availabilitiesList
            .map { it.jobCategoryId }
            .toSet()

        val jobCategories = jobCategoryService.findMultiple(requestId, jobCategoryIds)
        val jobCategoriesById = jobCategories.associateBy { it.id }

        return getUserAvailabilitiesResponse.availabilitiesList
            .map { availability ->
                val startDate = Date(availability.startDate)
                val endDate = Date(availability.endDate)

                Availability(
                    availability.id,
                    DateTimeFormatter.ISO_INSTANT.format(startDate.toInstant()),
                    DateTimeFormatter.ISO_INSTANT.format(endDate.toInstant()),
                    Address(
                        availability.address.firstLine,
                        availability.address.zipCode,
                        availability.address.city
                    ),
                    availability.range,
                    jobCategoriesById[availability.jobCategoryId] ?: JobCategory(
                        availability.jobCategoryId,
                        ""
                    )
                )
            }
    }

    fun createOneOfUser(requestId: String, userId: String, dto: CreateAvailabilityDto): Availability {
        // Create the availability using the profile service
        val request = RequestResponseFactory.newRequest(requestId)
            .setCreateUserAvailabilityRequest(
                Profile.CreateUserAvailabilityRequest.newBuilder()
                    .setUserId(userId)
                    .setAvailability(
                        CreateAvailabilityDtoOuterClass.CreateAvailabilityDto.newBuilder()
                            .setStartDate(dto.startDate.toEpochDay())
                            .setEndDate(dto.endDate.toEpochDay())
                            .setAddress(
                                AddressOuterClass.Address.newBuilder()
                                    .setFirstLine(dto.address.firstLine)
                                    .setZipCode(dto.address.zipCode)
                                    .setCity(dto.address.city)
                            )
                            .setRange(dto.range)
                            .setJobCategoryId(dto.jobCategoryId)
                    )
            )
            .build()

        val response = natsService.requestWithReply(createOneOfUserSubject, request)

        // Handle the response
        if (!response.hasCreateUserAvailabilityResponse()) {
            throw Exception("Invalid response")
        }

        val createUserAvailabilityResponse = response.createUserAvailabilityResponse
        val startDate = Date(createUserAvailabilityResponse.availability.startDate)
        val endDate = Date(createUserAvailabilityResponse.availability.endDate)

        return Availability(
            createUserAvailabilityResponse.availability.id,
            DateTimeFormatter.ISO_INSTANT.format(startDate.toInstant()),
            DateTimeFormatter.ISO_INSTANT.format(endDate.toInstant()),
            Address(
                createUserAvailabilityResponse.availability.address.firstLine,
                createUserAvailabilityResponse.availability.address.zipCode,
                createUserAvailabilityResponse.availability.address.city
            ),
            createUserAvailabilityResponse.availability.range,
            jobCategoryService.findOne(requestId, createUserAvailabilityResponse.availability.jobCategoryId)
        )
    }

    fun updateOneOfUser(requestId: String, userId: String, availabilityId: String, dto: UpdateAvailabilityDto): Availability {
        // Update the availability using the profile service
        val protoDto = UpdateAvailabilityDtoOuterClass.UpdateAvailabilityDto.newBuilder()
        if (dto.startDate != null) protoDto.setStartDate(dto.startDate.toEpochDay())
        if (dto.endDate != null) protoDto.setEndDate(dto.endDate.toEpochDay())
        if (dto.range != null) protoDto.setRange(dto.range)
        if (dto.jobCategoryId != null) protoDto.setJobCategoryId(dto.jobCategoryId)

        if (dto.address != null) {
            protoDto.setAddressFirstLine(dto.address.firstLine)
            protoDto.setAddressZip(dto.address.zipCode)
            protoDto.setAddressCity(dto.address.city)
        }

        val request = RequestResponseFactory.newRequest(requestId)
            .setUpdateUserAvailabilityRequest(
                Profile.UpdateUserAvailabilityRequest.newBuilder()
                    .setUserId(userId)
                    .setAvailabilityId(availabilityId)
                    .setAvailability(protoDto)
            )
            .build()

        val response = natsService.requestWithReply(updateOneOfUserSubject, request)

        // Handle the response
        if (!response.hasUpdateUserAvailabilityResponse()) {
            throw Exception("Invalid response")
        }

        val updateUserAvailabilityResponse = response.updateUserAvailabilityResponse
        val startDate = Date(updateUserAvailabilityResponse.availability.startDate)
        val endDate = Date(updateUserAvailabilityResponse.availability.endDate)

        return Availability(
            updateUserAvailabilityResponse.availability.id,
            DateTimeFormatter.ISO_INSTANT.format(startDate.toInstant()),
            DateTimeFormatter.ISO_INSTANT.format(endDate.toInstant()),
            Address(
                updateUserAvailabilityResponse.availability.address.firstLine,
                updateUserAvailabilityResponse.availability.address.zipCode,
                updateUserAvailabilityResponse.availability.address.city
            ),
            updateUserAvailabilityResponse.availability.range,
            jobCategoryService.findOne(requestId, updateUserAvailabilityResponse.availability.jobCategoryId)
        )
    }

    fun findOneOfUser(requestId: String, userId: String, availabilityId: String): Availability {
        // Request the availability from the profile service
        val request = RequestResponseFactory.newRequest(requestId)
            .setGetUserAvailabilityRequest(
                Profile.GetUserAvailabilityRequest.newBuilder()
                    .setUserId(userId)
                    .setAvailabilityId(availabilityId)
            )
            .build()

        val response = natsService.requestWithReply(findOneOfUserSubject, request)

        // Handle the response
        if (!response.hasGetUserAvailabilityResponse()) {
            throw Exception("Invalid response")
        }

        val getUserAvailabilityResponse = response.getUserAvailabilityResponse
        val startDate = Date(getUserAvailabilityResponse.availability.startDate)
        val endDate = Date(getUserAvailabilityResponse.availability.endDate)

        return Availability(
            getUserAvailabilityResponse.availability.id,
            DateTimeFormatter.ISO_INSTANT.format(startDate.toInstant()),
            DateTimeFormatter.ISO_INSTANT.format(endDate.toInstant()),
            Address(
                getUserAvailabilityResponse.availability.address.firstLine,
                getUserAvailabilityResponse.availability.address.zipCode,
                getUserAvailabilityResponse.availability.address.city
            ),
            getUserAvailabilityResponse.availability.range,
            jobCategoryService.findOne(requestId, getUserAvailabilityResponse.availability.jobCategoryId)
        )
    }

    fun deleteOneOfUser(requestId: String, userId: String, availabilityId: String) {
        // Delete the availability using the profile service
        val request = RequestResponseFactory.newRequest(requestId)
            .setDeleteUserAvailabilityRequest(
                Profile.DeleteUserAvailabilityRequest.newBuilder()
                    .setUserId(userId)
                    .setAvailabilityId(availabilityId)
            )
            .build()

        val response = natsService.requestWithReply(deleteOneOfUserSubject, request)

        // Handle the response
        if (!response.hasDeleteUserAvailabilityResponse()) {
            throw Exception("Invalid response")
        }
    }
}
