package com.linkedout.backend.service

import com.linkedout.backend.converter.availability.CreateAvailabilityDtoToProto
import com.linkedout.backend.converter.availability.UpdateAvailabilityDtoToProto
import com.linkedout.backend.dto.availability.CreateAvailabilityDto
import com.linkedout.backend.dto.availability.UpdateAvailabilityDto
import com.linkedout.backend.model.Address
import com.linkedout.backend.model.Availability
import com.linkedout.backend.model.JobCategory
import com.linkedout.common.service.NatsService
import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.proto.models.AvailabilityOuterClass
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
                convertAvailabilityFromProto(
                    availability,
                    jobCategoriesById.getOrDefault(availability.jobCategoryId, JobCategory(availability.jobCategoryId, ""))
                )
            }
    }

    fun createOneOfUser(requestId: String, userId: String, dto: CreateAvailabilityDto): Availability {
        // Get the job category
        val jobCategory = jobCategoryService.findOne(requestId, dto.jobCategoryId)

        // Create the availability using the profile service
        val request = RequestResponseFactory.newRequest(requestId)
            .setCreateUserAvailabilityRequest(
                Profile.CreateUserAvailabilityRequest.newBuilder()
                    .setUserId(userId)
                    .setAvailability(CreateAvailabilityDtoToProto().convert(dto))
            )
            .build()

        val response = natsService.requestWithReply(createOneOfUserSubject, request)

        // Handle the response
        if (!response.hasCreateUserAvailabilityResponse()) {
            throw Exception("Invalid response")
        }

        val createUserAvailabilityResponse = response.createUserAvailabilityResponse
        return convertAvailabilityFromProto(createUserAvailabilityResponse.availability, jobCategory)
    }

    fun updateOneOfUser(requestId: String, userId: String, availabilityId: String, dto: UpdateAvailabilityDto): Availability {
        // Get the job category
        var jobCategory = if (dto.jobCategoryId != null) jobCategoryService.findOne(requestId, dto.jobCategoryId) else null

        // Update the availability using the profile service
        val request = RequestResponseFactory.newRequest(requestId)
            .setUpdateUserAvailabilityRequest(
                Profile.UpdateUserAvailabilityRequest.newBuilder()
                    .setUserId(userId)
                    .setAvailabilityId(availabilityId)
                    .setAvailability(UpdateAvailabilityDtoToProto().convert(dto))
            )
            .build()

        val response = natsService.requestWithReply(updateOneOfUserSubject, request)

        // Handle the response
        if (!response.hasUpdateUserAvailabilityResponse()) {
            throw Exception("Invalid response")
        }

        val updateUserAvailabilityResponse = response.updateUserAvailabilityResponse
        if (jobCategory == null) jobCategory = jobCategoryService.findOne(requestId, updateUserAvailabilityResponse.availability.jobCategoryId)

        return convertAvailabilityFromProto(updateUserAvailabilityResponse.availability, jobCategory)
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
        val jobCategory = jobCategoryService.findOne(requestId, getUserAvailabilityResponse.availability.jobCategoryId)

        return convertAvailabilityFromProto(getUserAvailabilityResponse.availability, jobCategory)
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

    private fun convertAvailabilityFromProto(source: AvailabilityOuterClass.Availability, jobCategory: JobCategory): Availability {
        val startDate = Date(source.startDate)
        val endDate = Date(source.endDate)

        return Availability(
            source.id,
            DateTimeFormatter.ISO_INSTANT.format(startDate.toInstant()),
            DateTimeFormatter.ISO_INSTANT.format(endDate.toInstant()),
            Address(
                source.address.firstLine,
                source.address.zipCode,
                source.address.city
            ),
            source.range,
            jobCategory
        )
    }
}
