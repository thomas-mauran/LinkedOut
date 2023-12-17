package com.linkedout.profile.function.profile

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.profile.dto.CreateProfileDto
import com.linkedout.profile.service.ProfileService
import com.linkedout.profile.utils.ProfileGender
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.models.AddressOuterClass
import com.linkedout.proto.models.ProfileOuterClass
import com.linkedout.proto.services.Profile
import com.linkedout.proto.services.Profile.SetUserProfileResponse
import org.springframework.stereotype.Component
import java.time.LocalDate
import java.time.LocalTime
import java.time.ZoneOffset
import java.util.*
import java.util.function.Function

@Component
class SetProfileOfUser(private val profileService: ProfileService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Extract the request
        val request = t.setUserProfileRequest
        val userId = UUID.fromString(request.userId)
        val requestProfile = request.profile

        val createdProfile = CreateProfileDto(
            requestProfile.firstName,
            requestProfile.lastName,
            requestProfile.genderValue,
            LocalDate.ofEpochDay(requestProfile.birthday),
            requestProfile.nationality,
            requestProfile.addressFirstLine,
            requestProfile.addressZip,
            requestProfile.addressCity,
            requestProfile.phone,
            requestProfile.email,
            requestProfile.shortBio
        )

        // Set the profile in the database
        val reactiveResponse = profileService.setOneOfUser(userId, createdProfile)
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
                SetUserProfileResponse.newBuilder()
                    .setProfile(profile)
                    .build()
            }

        // Block until the response is ready
        val response = reactiveResponse.block()

        return RequestResponseFactory.newSuccessfulResponse()
            .setSetUserProfileResponse(response)
            .build()
    }
}
