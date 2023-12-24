package com.linkedout.jobs.function.jobOffers

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.jobs.service.JobApplicationService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Jobs.ApplyToJobOfferResponse
import org.springframework.stereotype.Component
import java.util.*
import java.util.function.Function

@Component
class ApplyToJobOffer(private val jobApplicationService: JobApplicationService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Extract the request
        val request = t.applyToJobOfferRequest
        val userId = UUID.fromString(request.userId)
        val jobOfferId = UUID.fromString(request.jobOfferId)

        // Apply to the job offer
        jobApplicationService.applyTo(userId, jobOfferId).block()

        return RequestResponseFactory.newSuccessfulResponse()
            .setApplyToJobOfferResponse(ApplyToJobOfferResponse.getDefaultInstance())
            .build()
    }
}
