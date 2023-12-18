package com.linkedout.backend.service

import com.linkedout.backend.dto.profile.CreateProfileDto
import com.linkedout.backend.dto.profile.ProfileWithStatsDto
import com.linkedout.backend.dto.profile.UpdateProfileDto
import com.linkedout.backend.model.Address
import com.linkedout.backend.model.Profile
import com.linkedout.common.service.NatsService
import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.proto.dto.profile.SetProfileDtoOuterClass
import com.linkedout.proto.dto.profile.UpdateProfileDtoOuterClass
import com.linkedout.proto.services.Profile.DeleteProfileRequest
import com.linkedout.proto.services.Profile.GetProfilesRequestingDeletionRequest
import com.linkedout.proto.services.Profile.GetUserProfileRequest
import com.linkedout.proto.services.Profile.RequestUserProfileDeletionRequest
import com.linkedout.proto.services.Profile.SetUserProfileRequest
import com.linkedout.proto.services.Profile.UpdateUserProfileRequest
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.time.format.DateTimeFormatter
import java.util.*

@Service
class ProfileService(
    private val natsService: NatsService,
    @Value("\${app.services.profile.subjects.deleteOne}") private val deleteOneSubject: String,
    @Value("\${app.services.profile.subjects.findOneOfUser}") private val findOneOfUserSubject: String,
    @Value("\${app.services.profile.subjects.findAllRequestingDeletion}") private val findAllRequestingDeletionSubject: String,
    @Value("\${app.services.profile.subjects.requestDeletionOfUser}") private val requestDeletionOfUserSubject: String,
    @Value("\${app.services.profile.subjects.saveOneOfUser}") private val saveOneOfUserSubject: String,
    @Value("\${app.services.profile.subjects.updateOneOfUser}") private val updateOneOfUserSubject: String
) {
    fun findOne(requestId: String, userId: String): ProfileWithStatsDto {
        // Request profile from the profile service
        val request = RequestResponseFactory.newRequest(requestId)
            .setGetUserProfileRequest(
                GetUserProfileRequest.newBuilder()
                    .setUserId(userId)
            )
            .build()

        val response = natsService.requestWithReply(findOneOfUserSubject, request)

        // Handle the response
        if (!response.hasGetUserProfileResponse()) {
            throw Exception("Invalid response")
        }

        val getUserProfileResponse = response.getUserProfileResponse
        val birthday = Date(getUserProfileResponse.profile.birthday)

        return ProfileWithStatsDto(
            getUserProfileResponse.profile.id,
            getUserProfileResponse.profile.firstName,
            getUserProfileResponse.profile.lastName,
            getUserProfileResponse.profile.genderValue,
            DateTimeFormatter.ISO_INSTANT.format(birthday.toInstant()),
            getUserProfileResponse.profile.nationality,
            Address(
                getUserProfileResponse.profile.address.firstLine,
                getUserProfileResponse.profile.address.zipCode,
                getUserProfileResponse.profile.address.city
            ),
            getUserProfileResponse.profile.phone,
            getUserProfileResponse.profile.email,
            getUserProfileResponse.profile.shortBio,
            getUserProfileResponse.profile.deletionRequested,
            getUserProfileResponse.nbExperiences,
            getUserProfileResponse.nbReviews,
            getUserProfileResponse.averageRating
        )
    }

    fun setOne(requestId: String, userId: String, dto: CreateProfileDto): Profile {
        // Set the profile using the profile service
        val request = RequestResponseFactory.newRequest(requestId)
            .setSetUserProfileRequest(
                SetUserProfileRequest.newBuilder()
                    .setUserId(userId)
                    .setProfile(
                        SetProfileDtoOuterClass.SetProfileDto.newBuilder()
                            .setFirstName(dto.firstName)
                            .setLastName(dto.lastName)
                            .setGenderValue(dto.gender)
                            .setBirthday(dto.birthday.toEpochDay())
                            .setNationality(dto.nationality)
                            .setAddressFirstLine(dto.address.firstLine)
                            .setAddressZip(dto.address.zipCode)
                            .setAddressCity(dto.address.city)
                            .setPhone(dto.phone)
                            .setEmail(dto.email)
                            .setShortBio(dto.shortBiography)
                    )
            )
            .build()

        val response = natsService.requestWithReply(saveOneOfUserSubject, request)

        // Handle the response
        if (!response.hasSetUserProfileResponse()) {
            throw Exception("Invalid response")
        }

        val setUserProfileResponse = response.setUserProfileResponse
        val birthday = Date(setUserProfileResponse.profile.birthday)

        return Profile(
            setUserProfileResponse.profile.id,
            setUserProfileResponse.profile.firstName,
            setUserProfileResponse.profile.lastName,
            setUserProfileResponse.profile.genderValue,
            DateTimeFormatter.ISO_INSTANT.format(birthday.toInstant()),
            setUserProfileResponse.profile.nationality,
            Address(
                setUserProfileResponse.profile.address.firstLine,
                setUserProfileResponse.profile.address.zipCode,
                setUserProfileResponse.profile.address.city
            ),
            setUserProfileResponse.profile.phone,
            setUserProfileResponse.profile.email,
            setUserProfileResponse.profile.shortBio,
            setUserProfileResponse.profile.deletionRequested
        )
    }

    fun updateOne(requestId: String, userId: String, dto: UpdateProfileDto): Profile {
        // Update the profile using the profile service
        val protoDtoBuilder = UpdateProfileDtoOuterClass.UpdateProfileDto.newBuilder()
        if (dto.firstName != null) protoDtoBuilder.setFirstName(dto.firstName)
        if (dto.lastName != null) protoDtoBuilder.setLastName(dto.lastName)
        if (dto.gender != null) protoDtoBuilder.setGenderValue(dto.gender)
        if (dto.birthday != null) protoDtoBuilder.setBirthday(dto.birthday.toEpochDay())
        if (dto.nationality != null) protoDtoBuilder.setNationality(dto.nationality)
        if (dto.phone != null) protoDtoBuilder.setPhone(dto.phone)
        if (dto.email != null) protoDtoBuilder.setEmail(dto.email)
        if (dto.shortBiography != null) protoDtoBuilder.setShortBio(dto.shortBiography)

        if (dto.address != null) {
            protoDtoBuilder.setAddressFirstLine(dto.address.firstLine)
            protoDtoBuilder.setAddressZip(dto.address.zipCode)
            protoDtoBuilder.setAddressCity(dto.address.city)
        }

        val request = RequestResponseFactory.newRequest(requestId)
            .setUpdateUserProfileRequest(
                UpdateUserProfileRequest.newBuilder()
                    .setUserId(userId)
                    .setProfile(protoDtoBuilder)
            )
            .build()

        val response = natsService.requestWithReply(updateOneOfUserSubject, request)

        // Handle the response
        if (!response.hasUpdateUserProfileResponse()) {
            throw Exception("Invalid response")
        }

        val updateUserProfileResponse = response.updateUserProfileResponse
        val birthday = Date(updateUserProfileResponse.profile.birthday)

        return Profile(
            updateUserProfileResponse.profile.id,
            updateUserProfileResponse.profile.firstName,
            updateUserProfileResponse.profile.lastName,
            updateUserProfileResponse.profile.genderValue,
            DateTimeFormatter.ISO_INSTANT.format(birthday.toInstant()),
            updateUserProfileResponse.profile.nationality,
            Address(
                updateUserProfileResponse.profile.address.firstLine,
                updateUserProfileResponse.profile.address.zipCode,
                updateUserProfileResponse.profile.address.city
            ),
            updateUserProfileResponse.profile.phone,
            updateUserProfileResponse.profile.email,
            updateUserProfileResponse.profile.shortBio,
            updateUserProfileResponse.profile.deletionRequested
        )
    }

    fun requestDeletion(requestId: String, userId: String) {
        // Request profile deletion using the profile service
        val request = RequestResponseFactory.newRequest(requestId)
            .setRequestUserProfileDeletionRequest(
                RequestUserProfileDeletionRequest.newBuilder()
                    .setUserId(userId)
            )
            .build()

        val response = natsService.requestWithReply(requestDeletionOfUserSubject, request)

        // Handle the response
        if (!response.hasRequestUserProfileDeletionResponse()) {
            throw Exception("Invalid response")
        }
    }

    fun getProfilesRequestingDeletion(requestId: String): List<Profile> {
        // Request profiles requesting deletion from the profile service
        val request = RequestResponseFactory.newRequest(requestId)
            .setGetProfilesRequestingDeletionRequest(GetProfilesRequestingDeletionRequest.getDefaultInstance())
            .build()

        val response = natsService.requestWithReply(findAllRequestingDeletionSubject, request)

        // Handle the response
        if (!response.hasGetProfilesRequestingDeletionResponse()) {
            throw Exception("Invalid response")
        }

        val getProfilesRequestingDeletionResponse = response.getProfilesRequestingDeletionResponse

        return getProfilesRequestingDeletionResponse.profilesList.map {
            val birthday = Date(it.birthday)

            Profile(
                it.id,
                it.firstName,
                it.lastName,
                it.genderValue,
                DateTimeFormatter.ISO_INSTANT.format(birthday.toInstant()),
                it.nationality,
                Address(
                    it.address.firstLine,
                    it.address.zipCode,
                    it.address.city
                ),
                it.phone,
                it.email,
                it.shortBio,
                it.deletionRequested
            )
        }
    }

    fun deleteOne(requestId: String, profileId: String) {
        // Delete a profile using the profile service
        val request = RequestResponseFactory.newRequest(requestId)
            .setDeleteProfileRequest(
                DeleteProfileRequest.newBuilder()
                    .setId(profileId)
            )
            .build()

        val response = natsService.requestWithReply(deleteOneSubject, request)

        // Handle the response
        if (!response.hasDeleteProfileResponse()) {
            throw Exception("Invalid response")
        }
    }
}
