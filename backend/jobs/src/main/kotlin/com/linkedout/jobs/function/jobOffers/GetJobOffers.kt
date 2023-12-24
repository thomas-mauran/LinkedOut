package com.linkedout.jobs.function.jobOffers

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.jobs.converter.jobOffers.JobOfferWithJobAndCompanyToProto
import com.linkedout.jobs.service.JobOfferService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Jobs
import org.springframework.stereotype.Component
import java.util.function.Function

@Component
class GetJobOffers(private val jobOfferService: JobOfferService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Get all the job offers from the database
        val reactiveResponse = jobOfferService.findAll()
            .map { jobOffer ->
                JobOfferWithJobAndCompanyToProto().convert(jobOffer)
            }
            .filter { it != null }
            .reduce(Jobs.GetJobOffersResponse.newBuilder()) { builder, jobOffer ->
                builder.addJobOffers(jobOffer)
                builder
            }
            .map { builder ->
                builder.build()
            }

        // Block until the response is ready
        val response = reactiveResponse.block()
            ?: return RequestResponseFactory.newSuccessfulResponse()
                .setGetJobOffersResponse(Jobs.GetJobOffersResponse.getDefaultInstance())
                .build()

        return RequestResponseFactory.newSuccessfulResponse()
            .setGetJobOffersResponse(response)
            .build()
    }
}
