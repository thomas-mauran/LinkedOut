package com.linkedout.jobs.function.jobOffers

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.jobs.converter.jobOffers.JobOfferWithJobAndCompanyToProto
import com.linkedout.jobs.service.JobOfferService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Jobs
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
import java.util.UUID
import java.util.function.Function

@Component
class GetJobOffer(private val jobOfferService: JobOfferService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Get the job offer from the database
        val reactiveResponse = jobOfferService.findOne(UUID.fromString(t.getJobOfferRequest.id))
            .map { jobOffer ->
                JobOfferWithJobAndCompanyToProto().convert(jobOffer)
            }
            .map { jobOffer ->
                Jobs.GetJobOfferResponse.newBuilder()
                    .setJobOffer(jobOffer)
                    .build()
            }

        // Block until the response is ready
        val response = reactiveResponse.block()
            ?: return RequestResponseFactory.newFailedResponse("Job offer not found", HttpStatus.NOT_FOUND).build()

        return RequestResponseFactory.newSuccessfulResponse()
            .setGetJobOfferResponse(response)
            .build()
    }
}
