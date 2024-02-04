package com.linkedout.recommendation.function.experience

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Recommendations
import com.linkedout.recommendation.dto.CreateEntityDto
import com.linkedout.recommendation.service.ExperienceService
import org.springframework.stereotype.Component
import java.util.*
import java.util.function.Function

@Component
class CreateRecommendationExperience(private val experienceService: ExperienceService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Extract the request
        val request = t.createRecommendationExperienceRequest
        val requestDto = CreateEntityDto(
            UUID.fromString(request.experience.id),
            request.experience.jobId,
            request.experience.profileId
        )

        // Create the profile
        val reactiveResponse = experienceService.saveExperience(requestDto)
            .map { experience ->
                Recommendations.CreateRecommendationExperienceResponse.newBuilder()
                    .setId(experience.id.toString())
                    .build()
            }

        // Block until the response is ready
        val response = reactiveResponse.block()

        // create the recommendation profile in neo4j

        return RequestResponseFactory.newSuccessfulResponse()
            .setCreateRecommendationExperienceResponse(response)
            .build()
    }
}
