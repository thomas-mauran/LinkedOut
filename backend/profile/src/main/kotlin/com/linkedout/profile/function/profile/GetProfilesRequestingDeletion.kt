package com.linkedout.profile.function.profile

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.profile.service.ProfileService
import com.linkedout.profile.utils.ProfileGender
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.models.AddressOuterClass
import com.linkedout.proto.models.ProfileOuterClass
import com.linkedout.proto.services.Profile.GetProfilesRequestingDeletionResponse
import org.springframework.stereotype.Component
import java.time.LocalTime
import java.time.ZoneOffset
import java.util.function.Function

@Component
class GetProfilesRequestingDeletion(private val profileService: ProfileService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Get the companies from the database
        val reactiveResponse = profileService.findAllPendingDeletion()
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
            }.reduce(GetProfilesRequestingDeletionResponse.newBuilder()) { builder, profile ->
                builder.addProfiles(profile)
                builder
            }
            .map { builder ->
                builder.build()
            }

        // Block until the response is ready
        val response = reactiveResponse.block()
            ?: return RequestResponseFactory.newSuccessfulResponse()
                .setGetProfilesRequestingDeletionResponse(GetProfilesRequestingDeletionResponse.getDefaultInstance())
                .build()

        return RequestResponseFactory.newSuccessfulResponse()
            .setGetProfilesRequestingDeletionResponse(response)
            .build()
    }
}
