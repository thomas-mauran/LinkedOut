package com.linkedout.employer.function.evaluation

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.employer.converter.evaluation.CreateEvaluationDtoFromProto
import com.linkedout.employer.converter.evaluation.EvaluationToProto
import com.linkedout.employer.service.EvaluationService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Employer.CreateEmployerEvaluationResponse
import org.springframework.stereotype.Component
import java.util.*
import java.util.function.Function

@Component
class CreateEvaluation(private val evaluationService: EvaluationService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Extract the request
        val request = t.createEmployerEvaluationRequest
        val userId = UUID.fromString(request.userId)
        val employerId = UUID.fromString(request.employerId)
        val requestDto = CreateEvaluationDtoFromProto().convert(request.evaluation)

        // Create the evaluation
        val reactiveResponse = evaluationService.saveOneOfUserAndEmployer(userId, employerId, requestDto)
            .map { evaluation ->
                EvaluationToProto().convert(evaluation)
            }
            .map { evaluation ->
                CreateEmployerEvaluationResponse.newBuilder()
                    .setEvaluation(evaluation)
                    .build()
            }

        // Block until the response is ready
        val response = reactiveResponse.block()

        return RequestResponseFactory.newSuccessfulResponse()
            .setCreateEmployerEvaluationResponse(response)
            .build()
    }
}
