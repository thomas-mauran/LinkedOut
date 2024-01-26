package com.linkedout.recommendation.function.experience

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Recommendations
import com.linkedout.recommendation.converter.experience.ExperienceToProto
import com.linkedout.recommendation.entity.ExperienceEntity
import com.linkedout.recommendation.entity.JobCategory
import com.linkedout.recommendation.entity.JobEntity
import com.linkedout.recommendation.entity.ProfileEntity
import com.linkedout.recommendation.service.ExperienceService
import org.springframework.stereotype.Component
import java.util.*
import java.util.function.Function

@Component
class CreateRecommendationExperience(private val experienceService: ExperienceService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {

        // Extract the request
        val request = t.createRecommendationExperienceRequest
        val requestDto = ExperienceEntity(
            UUID.fromString(request.experience.id),
            JobEntity(
                UUID.fromString(request.experience.jobId),
                request.experience.jobTitle,
                JobCategory(request.experience.jobCategory)
            ),
            ProfileEntity(
                UUID.fromString(request.experience.profileId)
            )
        )

        // Create the profile
        val reactiveResponse = experienceService.saveExperience(requestDto)
            .map { experience ->
                ExperienceToProto().convert(experience)
            }
            .map { experience ->
                Recommendations.CreateRecommendationExperienceResponse.newBuilder()
                    .setId(experience.id)
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
