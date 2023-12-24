package com.linkedout.employer.function.evaluation

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.employer.converter.evaluation.EvaluationToProto
import com.linkedout.employer.service.EvaluationService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Employer.GetEmployerEvaluationResponse
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
import java.util.*
import java.util.function.Function

@Component
class GetEvaluation(private val evaluationService: EvaluationService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Extract the request
        val request = t.getEmployerEvaluationRequest
        val userId = UUID.fromString(request.userId)
        val employerId = UUID.fromString(request.employerId)

        // Get the evaluation from the database
        val reactiveResponse = evaluationService.findByUserIdAndEmployerId(userId, employerId)
            .map { evaluation ->
                EvaluationToProto().convert(evaluation)
            }
            .map { evaluation ->
                GetEmployerEvaluationResponse.newBuilder()
                    .setEvaluation(evaluation)
                    .build()
            }

        // Block until the response is ready
        val response = reactiveResponse.block()
            ?: return RequestResponseFactory.newFailedResponse("Evaluation not found", HttpStatus.NOT_FOUND).build()

        return RequestResponseFactory.newSuccessfulResponse()
            .setGetEmployerEvaluationResponse(response)
            .build()
    }
}
