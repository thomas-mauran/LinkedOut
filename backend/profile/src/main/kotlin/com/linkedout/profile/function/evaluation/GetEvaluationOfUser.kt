package com.linkedout.profile.function.evaluation

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.profile.converter.evaluation.EvaluationToProto
import com.linkedout.profile.service.EvaluationService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Profile.GetUserEvaluationResponse
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
import java.util.*
import java.util.function.Function

@Component
class GetEvaluationOfUser(private val evaluationService: EvaluationService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Extract the request
        val request = t.getUserEvaluationRequest
        val userId = UUID.fromString(request.userId)
        val evaluationId = UUID.fromString(request.evaluationId)

        // Get the evaluation from the database
        val reactiveResponse = evaluationService.findByUserIdAndEvaluationId(userId, evaluationId)
            .map { evaluation ->
                EvaluationToProto().convert(evaluation)
            }
            .map { evaluation ->
                GetUserEvaluationResponse.newBuilder()
                    .setEvaluation(evaluation)
                    .build()
            }

        // Block until the response is ready
        val response = reactiveResponse.block()
            ?: return RequestResponseFactory.newFailedResponse("Evaluation not found", HttpStatus.NOT_FOUND).build()

        return RequestResponseFactory.newSuccessfulResponse()
            .setGetUserEvaluationResponse(response)
            .build()
    }
}
