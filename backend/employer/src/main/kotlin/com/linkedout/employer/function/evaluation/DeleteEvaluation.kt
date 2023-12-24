package com.linkedout.employer.function.evaluation

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.employer.service.EvaluationService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Employer
import org.springframework.stereotype.Component
import java.util.*
import java.util.function.Function

@Component
class DeleteEvaluation(private val evaluationService: EvaluationService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Extract the request
        val request = t.deleteEmployerEvaluationRequest
        val userId = UUID.fromString(request.userId)
        val employerId = UUID.fromString(request.employerId)

        // Delete the evaluation
        evaluationService.deleteByUserIdAndEmployerId(userId, employerId).block()

        return RequestResponseFactory.newSuccessfulResponse()
            .setDeleteEmployerEvaluationResponse(Employer.DeleteEmployerEvaluationResponse.getDefaultInstance())
            .build()
    }
}
