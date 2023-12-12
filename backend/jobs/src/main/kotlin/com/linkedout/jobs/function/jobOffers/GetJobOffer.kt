package com.linkedout.jobs.function.jobOffers

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.jobs.service.JobOfferService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.models.CompanyOuterClass
import com.linkedout.proto.models.JobOfferOuterClass
import com.linkedout.proto.models.JobOuterClass
import com.linkedout.proto.services.Jobs
import org.springframework.stereotype.Component
import java.util.UUID
import java.util.function.Function

@Component
class GetJobOffer(private val jobOfferService: JobOfferService) : Function<Request, Response> {
    override fun apply(t: Request): Response {
        // Get the job offer from the database
        val responseMono = jobOfferService.findOne(UUID.fromString(t.getJobOfferRequest.id))
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
            .map { jobOffer ->
                Jobs.GetJobOfferResponse.newBuilder()
                    .setJobOffer(jobOffer)
                    .build()
            }

        // Block until the response is ready
        val response = try {
            responseMono.block()
        } catch (e: Exception) {
            return RequestResponseFactory.newFailedResponse(e.message ?: "Unknown error").build()
        }
            ?: return RequestResponseFactory.newSuccessfulResponse()
                .setGetJobOfferResponse(Jobs.GetJobOfferResponse.getDefaultInstance())
                .build()
        return RequestResponseFactory.newSuccessfulResponse()
            .setGetJobOfferResponse(response)
            .build()
    }
}
