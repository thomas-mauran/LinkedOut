package com.linkedout.profile.function.profile

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.profile.converter.profile.ProfileToProto
import com.linkedout.profile.service.ProfileService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Profile.GetUserProfileResponse
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
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
                ProfileToProto().convert(profile)
            }
            .map { profile ->
                GetUserProfileResponse.newBuilder()
                    .setProfile(profile)
            }
            .zipWith(profileService.getProfileStatsOfUser(userId)) { profile, stats ->
                profile.setNbExperiences(stats.nbExperiences)
                    .setNbReviews(stats.nbReviews)
                    .setAverageRating(stats.avgRating)
            }
            .map { profile ->
                profile.build()
            }

        // Block until the response is ready
        val response = reactiveResponse.block()
            ?: return RequestResponseFactory.newFailedResponse("Profile not found", HttpStatus.NOT_FOUND).build()

        return RequestResponseFactory.newSuccessfulResponse()
            .setGetUserProfileResponse(response)
            .build()
    }
}
