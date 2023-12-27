package com.linkedout.backend.service

import com.google.protobuf.ByteString
import com.linkedout.backend.converter.profile.SetProfileDtoToProto
import com.linkedout.backend.converter.profile.UpdateProfileDtoToProto
import com.linkedout.backend.dto.profile.ProfileWithStatsDto
import com.linkedout.backend.dto.profile.SetProfileDto
import com.linkedout.backend.dto.profile.UpdateProfileDto
import com.linkedout.backend.model.Address
import com.linkedout.backend.model.Profile
import com.linkedout.common.service.NatsService
import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.proto.models.ProfileOuterClass
import com.linkedout.proto.services.Profile.DeleteProfileRequest
import com.linkedout.proto.services.Profile.GetProfilesRequestingDeletionRequest
import com.linkedout.proto.services.Profile.GetUserCvRequest
import com.linkedout.proto.services.Profile.GetUserProfilePictureRequest
import com.linkedout.proto.services.Profile.GetUserProfileRequest
import com.linkedout.proto.services.Profile.RequestUserProfileDeletionRequest
import com.linkedout.proto.services.Profile.SetUserCvRequest
import com.linkedout.proto.services.Profile.SetUserProfilePictureRequest
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
    @Value("\${app.services.profile.subjects.updateOneOfUser}") private val updateOneOfUserSubject: String,
    @Value("\${app.services.profile.subjects.findOneCvOfUser}") private val findOneCvOfUserSubject: String,
    @Value("\${app.services.profile.subjects.saveOneCvOfUser}") private val saveOneCvOfUserSubject: String,
    @Value("\${app.services.profile.subjects.findOneProfilePictureOfUser}") private val findOneProfilePictureOfUserSubject: String,
    @Value("\${app.services.profile.subjects.saveOneProfilePictureOfUser}") private val saveOneProfilePictureOfUserSubject: String
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

    fun setOne(requestId: String, userId: String, dto: SetProfileDto): Profile {
        // Set the profile using the profile service
        val request = RequestResponseFactory.newRequest(requestId)
            .setSetUserProfileRequest(
                SetUserProfileRequest.newBuilder()
                    .setUserId(userId)
                    .setProfile(SetProfileDtoToProto().convert(dto))
            )
            .build()

        val response = natsService.requestWithReply(saveOneOfUserSubject, request)

        // Handle the response
        if (!response.hasSetUserProfileResponse()) {
            throw Exception("Invalid response")
        }

        val setUserProfileResponse = response.setUserProfileResponse
        return convertProfileFromProto(setUserProfileResponse.profile)
    }

    fun updateOne(requestId: String, userId: String, dto: UpdateProfileDto): Profile {
        // Update the profile using the profile service
        val request = RequestResponseFactory.newRequest(requestId)
            .setUpdateUserProfileRequest(
                UpdateUserProfileRequest.newBuilder()
                    .setUserId(userId)
                    .setProfile(UpdateProfileDtoToProto().convert(dto))
            )
            .build()

        val response = natsService.requestWithReply(updateOneOfUserSubject, request)

        // Handle the response
        if (!response.hasUpdateUserProfileResponse()) {
            throw Exception("Invalid response")
        }

        val updateUserProfileResponse = response.updateUserProfileResponse
        return convertProfileFromProto(updateUserProfileResponse.profile)
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

        return getProfilesRequestingDeletionResponse.profilesList.map { profile ->
            convertProfileFromProto(profile)
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

    fun findOneCv(requestId: String, userId: String): ByteArray {
        // Request a CV from the profile service
        val request = RequestResponseFactory.newRequest(requestId)
            .setGetUserCvRequest(
                GetUserCvRequest.newBuilder()
                    .setUserId(userId)
            )
            .build()

        val response = natsService.requestWithReply(findOneCvOfUserSubject, request)

        // Handle the response
        if (!response.hasGetUserCvResponse()) {
            throw Exception("Invalid response")
        }

        val getUserCvResponse = response.getUserCvResponse
        return getUserCvResponse.cv.toByteArray()
    }

    fun setOneCv(requestId: String, userId: String, cv: ByteArray) {
        // Set a CV using the profile service
        val request = RequestResponseFactory.newRequest(requestId)
            .setSetUserCvRequest(
                SetUserCvRequest.newBuilder()
                    .setUserId(userId)
                    .setCv(ByteString.copyFrom(cv))
            )
            .build()

        val response = natsService.requestWithReply(saveOneCvOfUserSubject, request)

        // Handle the response
        if (!response.hasSetUserCvResponse()) {
            throw Exception("Invalid response")
        }
    }

    fun findOneProfilePicture(requestId: String, userId: String): ByteArray {
        // Request a profile picture from the profile service
        val request = RequestResponseFactory.newRequest(requestId)
            .setGetUserProfilePictureRequest(
                GetUserProfilePictureRequest.newBuilder()
                    .setUserId(userId)
            )
            .build()

        val response = natsService.requestWithReply(findOneProfilePictureOfUserSubject, request)

        // Handle the response
        if (!response.hasGetUserProfilePictureResponse()) {
            throw Exception("Invalid response")
        }

        val getUserProfilePictureResponse = response.getUserProfilePictureResponse
        return getUserProfilePictureResponse.picture.toByteArray()
    }

    fun setOneProfilePicture(requestId: String, userId: String, picture: ByteArray) {
        // Set a profile picture using the profile service
        val request = RequestResponseFactory.newRequest(requestId)
            .setSetUserProfilePictureRequest(
                SetUserProfilePictureRequest.newBuilder()
                    .setUserId(userId)
                    .setPicture(ByteString.copyFrom(picture))
            )
            .build()

        val response = natsService.requestWithReply(saveOneProfilePictureOfUserSubject, request)

        // Handle the response
        if (!response.hasSetUserProfilePictureResponse()) {
            throw Exception("Invalid response")
        }
    }

    private fun convertProfileFromProto(source: ProfileOuterClass.Profile): Profile {
        val birthday = Date(source.birthday)

        return Profile(
            source.id,
            source.firstName,
            source.lastName,
            source.genderValue,
            DateTimeFormatter.ISO_INSTANT.format(birthday.toInstant()),
            source.nationality,
            Address(
                source.address.firstLine,
                source.address.zipCode,
                source.address.city
            ),
            source.phone,
            source.email,
            source.shortBio,
            source.deletionRequested
        )
    }
}
