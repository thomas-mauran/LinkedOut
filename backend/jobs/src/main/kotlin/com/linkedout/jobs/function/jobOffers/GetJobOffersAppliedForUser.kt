package com.linkedout.jobs.function.jobOffers

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.jobs.converter.jobOffers.JobOfferWithJobAndCompanyToProto
import com.linkedout.jobs.service.JobOfferService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Jobs
import org.springframework.stereotype.Component
import java.util.UUID
import java.util.function.Function

@Component
class GetJobOffersAppliedForUser(private val jobOfferService: JobOfferService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Extract the request
        val request = t.getUserJobOffersAppliedRequest
        val userId = UUID.fromString(request.userId)

        // Get all the job offers from the database
        val reactiveResponse = jobOfferService.findAllAppliedForUser(userId)
            .map { jobOffer ->
                JobOfferWithJobAndCompanyToProto().convert(jobOffer)
                    .setStatusValue(jobOffer.jobApplicationStatus)
            }
            .filter { it != null }
            .reduce(Jobs.GetUserJobOffersAppliedResponse.newBuilder()) { builder, jobOffer ->
                builder.addJobOffers(jobOffer)
                builder
            }
            .map { builder ->
                builder.build()
            }

        // Block until the response is ready
        val response = reactiveResponse.block()
            ?: return RequestResponseFactory.newSuccessfulResponse()
                .setGetUserJobOffersAppliedResponse(Jobs.GetUserJobOffersAppliedResponse.getDefaultInstance())
                .build()

        return RequestResponseFactory.newSuccessfulResponse()
            .setGetUserJobOffersAppliedResponse(response)
            .build()
    }
}
