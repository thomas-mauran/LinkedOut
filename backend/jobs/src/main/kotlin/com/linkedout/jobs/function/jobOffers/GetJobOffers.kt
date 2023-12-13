package com.linkedout.jobs.function.jobOffers

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.jobs.service.JobOfferService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.models.CompanyOuterClass
import com.linkedout.proto.models.JobOfferOuterClass
import com.linkedout.proto.models.JobOuterClass
import com.linkedout.proto.services.Jobs
import org.springframework.stereotype.Component
import java.util.function.Function

@Component
class GetJobOffers(private val jobOfferService: JobOfferService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Get all the job offers from the database
        val reactiveResponse = jobOfferService.findAll()
            .map { jobOffer ->
                JobOfferOuterClass.JobOffer.newBuilder()
                    .setId(jobOffer.jobOfferId)
                    .setTitle(jobOffer.title)
                    .setDescription(jobOffer.description)
                    .setStartDate(jobOffer.startDate.toString())
                    .setEndDate(jobOffer.endDate.toString())
                    .setGeographicArea(jobOffer.geographicArea)
                    .setSalary(jobOffer.salary)
                    .setCompany(
                        CompanyOuterClass.Company.newBuilder()
                            .setId(jobOffer.companyId)
                            .setName(jobOffer.companyName)
                    )
                    .setJob(
                        JobOuterClass.Job.newBuilder()
                            .setId(jobOffer.jobId)
                            .setTitle(jobOffer.jobTitle)
                            .setCategory(jobOffer.jobCategoryTitle)
                    )
                    .setStatus(jobOffer.jobOfferStatus)
                    .build()
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
