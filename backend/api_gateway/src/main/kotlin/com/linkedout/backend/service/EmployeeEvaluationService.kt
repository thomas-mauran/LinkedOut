package com.linkedout.backend.service

import com.linkedout.backend.model.*
import com.linkedout.common.service.NatsService
import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.proto.models.EmployeeEvaluationOuterClass
import com.linkedout.proto.services.Profile
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.time.format.DateTimeFormatter
import java.util.*

@Service
class EmployeeEvaluationService(
    private val natsService: NatsService,
    private val employerService: EmployerService,
    @Value("\${app.services.evaluation.subjects.findAllOfUser}") private val findAllOfUserSubject: String,
    @Value("\${app.services.evaluation.subjects.findOneOfUser}") private val findOneOfUserSubject: String
) {
    fun findAllOfUser(requestId: String, userId: String): List<EmployeeEvaluation> {
        // Request evaluations from the profile service
        val request = RequestResponseFactory.newRequest(requestId)
            .setGetUserEvaluationsRequest(
                Profile.GetUserEvaluationsRequest.newBuilder()
                    .setUserId(userId)
            )
            .build()

        val response = natsService.requestWithReply(findAllOfUserSubject, request)

        // Handle the response
        if (!response.hasGetUserEvaluationsResponse()) {
            throw Exception("Invalid response")
        }

        val getUserEvaluationsResponse = response.getUserEvaluationsResponse

        // Get the employers
        val employerIds = getUserEvaluationsResponse.evaluationsList
            .map { it.employerId }
            .toSet()

        val employers = employerService.findMultiple(requestId, employerIds)
        val employersById = employers.associateBy { it.id }

        return getUserEvaluationsResponse.evaluationsList
            .map { evaluation ->
                convertEvaluationFromProto(
                    evaluation,
                    employersById.getOrDefault(evaluation.employerId, Employer(evaluation.employerId, "", "", "", ""))
                )
            }
    }

    fun findOneOfUser(requestId: String, userId: String, evaluationId: String): EmployeeEvaluation {
        // Request the evaluation from the profile service
        val request = RequestResponseFactory.newRequest(requestId)
            .setGetUserEvaluationRequest(
                Profile.GetUserEvaluationRequest.newBuilder()
                    .setUserId(userId)
                    .setEvaluationId(evaluationId)
            )
            .build()

        val response = natsService.requestWithReply(findOneOfUserSubject, request)

        // Handle the response
        if (!response.hasGetUserEvaluationResponse()) {
            throw Exception("Invalid response")
        }

        val getUserEvaluationResponse = response.getUserEvaluationResponse
        val employer = employerService.findOne(requestId, getUserEvaluationResponse.evaluation.employerId)

        return convertEvaluationFromProto(getUserEvaluationResponse.evaluation, employer)
    }

    private fun convertEvaluationFromProto(source: EmployeeEvaluationOuterClass.EmployeeEvaluation, employer: Employer): EmployeeEvaluation {
        val createdAt = Date(source.createdAt)

        return EmployeeEvaluation(
            source.id,
            employer.firstName,
            employer.lastName,
            source.score,
            source.comment,
            DateTimeFormatter.ISO_INSTANT.format(createdAt.toInstant())
        )
    }
}
