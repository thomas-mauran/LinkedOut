package com.linkedout.profile.function.profile

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.profile.service.ProfileService
import com.linkedout.profile.utils.ProfileGender
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.models.AddressOuterClass
import com.linkedout.proto.models.ProfileOuterClass.Profile
import com.linkedout.proto.services.Profile.GetUserProfileResponse
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
import java.time.LocalTime
import java.time.ZoneOffset
import java.util.*
import java.util.function.Function

@Component
class GetProfileOfUser(private val profileService: ProfileService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Extract the request
        val request = t.getUserProfileRequest
        val userId = UUID.fromString(request.userId)

        // Get the profile from the database
        val reactiveResponse = profileService.findOneOfUser(userId)
            .map { profile ->
                Profile.newBuilder()
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
                // TODO: Set nb_experiences, nb_reviews, average_rating
                GetUserProfileResponse.newBuilder()
                    .setProfile(profile)
                    .build()
            }

        // Block until the response is ready
        val response = reactiveResponse.block()
            ?: return RequestResponseFactory.newFailedResponse("Profile not found", HttpStatus.NOT_FOUND).build()

        return RequestResponseFactory.newSuccessfulResponse()
            .setGetUserProfileResponse(response)
            .build()
    }
}
