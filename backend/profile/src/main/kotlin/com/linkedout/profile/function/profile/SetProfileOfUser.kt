
package com.linkedout.profile.function.profile

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.profile.converter.profile.ProfileToProto
import com.linkedout.profile.converter.profile.SetProfileDtoFromProto
import com.linkedout.profile.service.ProfileService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Profile.SetUserProfileResponse
import org.springframework.stereotype.Component
import java.util.*
import java.util.function.Function

@Component
class SetProfileOfUser(private val profileService: ProfileService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {

        // Extract the request
        val request = t.setUserProfileRequest
        val userId = UUID.fromString(request.userId)
        val requestDto = SetProfileDtoFromProto().convert(request.profile)

        // Set the profile in the database
        val reactiveResponse = profileService.setOneOfUser(userId, requestDto)
            .map { profile ->
                ProfileToProto().convert(profile)
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
