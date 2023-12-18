package com.linkedout.profile.function.profile

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.profile.converter.profile.ProfileToProto
import com.linkedout.profile.converter.profile.UpdateProfileDtoFromProto
import com.linkedout.profile.service.ProfileService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Profile.UpdateUserProfileResponse
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
import java.util.*
import java.util.function.Function

@Component
class UpdateProfileOfUser(private val profileService: ProfileService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Extract the request
        val request = t.updateUserProfileRequest
        val userId = UUID.fromString(request.userId)
        val requestDto = UpdateProfileDtoFromProto().convert(request.profile)

        // Set the profile in the database
        val reactiveResponse = profileService.updateOneOfUser(userId, requestDto)
            .map { profile ->
                ProfileToProto().convert(profile)
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
