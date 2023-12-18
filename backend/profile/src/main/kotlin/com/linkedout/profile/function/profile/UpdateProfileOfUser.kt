package com.linkedout.profile.function.profile

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.profile.dto.profile.UpdateProfileDto
import com.linkedout.profile.service.ProfileService
import com.linkedout.profile.utils.ProfileGender
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.models.AddressOuterClass
import com.linkedout.proto.models.ProfileOuterClass
import com.linkedout.proto.services.Profile.UpdateUserProfileResponse
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
import java.time.LocalDate
import java.time.LocalTime
import java.time.ZoneOffset
import java.util.*
import java.util.function.Function

@Component
class UpdateProfileOfUser(private val profileService: ProfileService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Extract the request
        val request = t.updateUserProfileRequest
        val userId = UUID.fromString(request.userId)
        val requestProfile = request.profile

        val updatedProfile = UpdateProfileDto(
            if (requestProfile.hasFirstName()) requestProfile.firstName else null,
            if (requestProfile.hasLastName()) requestProfile.lastName else null,
            if (requestProfile.hasGender()) requestProfile.genderValue else null,
            if (requestProfile.hasBirthday()) LocalDate.ofEpochDay(requestProfile.birthday) else null,
            if (requestProfile.hasNationality()) requestProfile.nationality else null,
            if (requestProfile.hasAddressFirstLine()) requestProfile.addressFirstLine else null,
            if (requestProfile.hasAddressZip()) requestProfile.addressZip else null,
            if (requestProfile.hasAddressCity()) requestProfile.addressCity else null,
            if (requestProfile.hasPhone()) requestProfile.phone else null,
            if (requestProfile.hasEmail()) requestProfile.email else null,
            if (requestProfile.hasShortBio()) requestProfile.shortBio else null
        )

        // Set the profile in the database
        val reactiveResponse = profileService.updateOneOfUser(userId, updatedProfile)
            .map { profile ->
                ProfileOuterClass.Profile.newBuilder()
                    .setId(profile.id.toString())
                    .setFirstName(profile.firstName)
                    .setLastName(profile.lastName)
                    .setGender(ProfileGender.toProto(profile.gender))
                    .setBirthday(profile.birthday.toEpochSecond(LocalTime.MIDNIGHT, ZoneOffset.UTC) * 1000)
                    .setNationality(profile.nationality)
                    .setAddress(
                        AddressOuterClass.Address.newBuilder()
                            .setFirstLine(profile.addressFirstLine)
                            .setZipCode(profile.addressZip)
                            .setCity(profile.addressCity)
                    )
                    .setPhone(profile.phone)
                    .setEmail(profile.email)
                    .setShortBio(profile.shortBio)
                    .setDeletionRequested(profile.deletionRequested)
                    .build()
            }
            .map { profile ->
                UpdateUserProfileResponse.newBuilder()
                    .setProfile(profile)
                    .build()
            }

        // Block until the response is ready
        val response = reactiveResponse.block()
            ?: return RequestResponseFactory.newFailedResponse("Profile not found", HttpStatus.NOT_FOUND).build()

        return RequestResponseFactory.newSuccessfulResponse()
            .setUpdateUserProfileResponse(response)
            .build()
    }
}
