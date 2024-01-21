package com.linkedout.recommendation.function.profile

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Recommendations
import com.linkedout.recommendation.converter.profile.ProfileToProto
import com.linkedout.recommendation.entity.ProfileEntity
import com.linkedout.recommendation.service.ProfileService
import org.springframework.stereotype.Component
import java.util.*
import java.util.function.Function

@Component
class CreateProfile(private val profileService: ProfileService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Extract the request
        val request = t.createRecommendationProfileRequest
        val requestDto = ProfileEntity(
            UUID.fromString(request.profile.id)
        )

        // Create the profile
        val reactiveResponse = profileService.saveProfile(requestDto)
            .map { profile ->
                ProfileToProto().convert(profile)
            }
            .map { profile ->
                Recommendations.CreateRecommendationProfileResponse.newBuilder()
                    .setId(profile.id)
                    .build()
            }

        // Block until the response is ready
        val response = reactiveResponse.block()

        // create the recommendation profile in neo4j

        return RequestResponseFactory.newSuccessfulResponse()
            .setCreateRecommendationProfileResponse(response)
            .build()
    }
}
