package com.linkedout.profile.function.evaluation

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.profile.converter.evaluation.EvaluationToProto
import com.linkedout.profile.service.EvaluationService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Profile.GetUserEvaluationsResponse
import org.springframework.stereotype.Component
import java.util.UUID
import java.util.function.Function

@Component
class GetEvaluationsOfUser(private val evaluationService: EvaluationService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Extract the request
        val request = t.getUserEvaluationsRequest
        val userId = UUID.fromString(request.userId)

        // Get the evaluations from the database
        val reactiveResponse = evaluationService.findByUserId(userId)
            .map { evaluation ->
                EvaluationToProto().convert(evaluation)
            }.reduce(GetUserEvaluationsResponse.newBuilder()) { builder, evaluation ->
                builder.addEvaluations(evaluation)
                builder
            }
            .map { builder ->
                builder.build()
            }

        // Block until the response is ready
        val response = reactiveResponse.block()
            ?: return RequestResponseFactory.newSuccessfulResponse()
                .setGetUserEvaluationsResponse(GetUserEvaluationsResponse.getDefaultInstance())
                .build()

        return RequestResponseFactory.newSuccessfulResponse()
            .setGetUserEvaluationsResponse(response)
            .build()
    }
}
