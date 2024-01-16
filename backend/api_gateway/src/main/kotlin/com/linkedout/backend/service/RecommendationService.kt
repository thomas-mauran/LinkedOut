package com.linkedout.backend.service

import com.linkedout.backend.model.Company
import com.linkedout.backend.model.Job
import com.linkedout.backend.model.JobOffer
import com.linkedout.backend.model.Recommendation
import com.linkedout.common.service.NatsService
import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.proto.models.JobOfferOuterClass
import com.linkedout.proto.services.Recommendations
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.time.LocalDate

@Service
class RecommendationService(
    private val natsService: NatsService,
    @Value("\${app.services.recommendation.subjects.findAll}") private val findAllSubject: String
) {
    fun findAll(requestId: String): List<Recommendation> {
        // Request job offers from the job service
        val request = RequestResponseFactory.newRequest(requestId)
            .setGetUserRecommendation(
                Recommendations.GetRecommendationRequest.newBuilder()
            )
            .build()

        val response = natsService.requestWithReply(findAllSubject, request)

        // Handle the response
        if (!response.hasGetRecommendationResponse()) {
            throw Exception("Invalid response")
        }

        val getRecommendationResponse = response.getRecommendationResponse
        return getRecommendationResponse.recommendationsList.map { recommendation ->
            Recommendation(
                recommendation.id
            )
        }
    }
}
