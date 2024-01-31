package com.linkedout.recommendation.function.jobOffers

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Recommendations
import com.linkedout.recommendation.converter.recommendations.JobOfferToProto
import com.linkedout.recommendation.service.RecommendationService
import org.springframework.stereotype.Component
import java.util.function.Function

@Component
class GetRecommendations(private val recommendationService: RecommendationService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Extract the request
        val request = t.getRecommendationRequest

        val reactiveResponse = recommendationService.getRecommendations(request.userId)
            .map { jobOffer ->
                JobOfferToProto().convert(jobOffer)
            }
            .filter { it != null }
            .reduce(Recommendations.GetRecommendationResponse.newBuilder()) { builder, jobOffer ->
                builder.addRecommendations(jobOffer)
                builder
            }
            .map { builder ->
                builder.build()
            }

        // Block until the response is ready
        val response = reactiveResponse.block()
            ?: return RequestResponseFactory.newSuccessfulResponse()
                .setGetRecommendationResponse(Recommendations.GetRecommendationResponse.getDefaultInstance())
                .build()
        return RequestResponseFactory.newSuccessfulResponse()
            .setGetRecommendationResponse(response)
            .build()
    }
}
