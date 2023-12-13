package com.linkedout.backend.service

import com.linkedout.backend.model.Company
import com.linkedout.backend.model.Job
import com.linkedout.backend.model.JobOffer
import com.linkedout.common.service.NatsService
import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.proto.services.Jobs
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.time.LocalDate

@Service
class JobOfferService(
    private val natsService: NatsService,
    private val jobService: JobService,
    private val companyService: CompanyService,
    @Value("\${app.services.jobOffers.subjects.findAll}") private val findAllSubject: String,
    @Value("\${app.services.jobOffers.subjects.findOne}") private val findOneSubject: String
) {
    fun findAll(requestId: String): List<JobOffer> {
        // Request job offers from the job service
        val response = natsService.requestWithReply(findAllSubject, RequestResponseFactory.newRequest(requestId).build())

        // Handle the response
        if (!response.hasGetJobOffersResponse()) {
            throw Exception("Invalid response")
        }

        val getJobOffersResponse = response.getJobOffersResponse

        // TODO: Implement status with join table
        return getJobOffersResponse.jobOffersList.map { jobOffer ->
            JobOffer(
                jobOffer.id,
                jobOffer.title,
                jobOffer.description,
                LocalDate.parse(jobOffer.startDate),
                LocalDate.parse(jobOffer.endDate),
                jobOffer.geographicArea,
                Job(
                    jobOffer.job.id,
                    jobOffer.job.title,
                    jobOffer.job.category
                ),
                Company(
                    jobOffer.company.id,
                    jobOffer.company.name
                ),
                jobOffer.salary,
                jobOffer.status
            )
        }
    }

    fun findOne(requestId: String, id: String): JobOffer {
        // Request the job offer from the job offer service
        val request = RequestResponseFactory.newRequest(requestId)
            .setGetJobOfferRequest(
                Jobs.GetJobOfferRequest.newBuilder()
                    .setId(id)
            )
            .build()

        val response = natsService.requestWithReply(findOneSubject, request)

        // Handle the response
        if (!response.hasGetJobOfferResponse()) {
            throw Exception("Invalid response")
        }

        // TODO: Implement status with join table

        val getJobOfferResponse = response.getJobOfferResponse
        return JobOffer(
            getJobOfferResponse.jobOffer.id,
            getJobOfferResponse.jobOffer.title,
            getJobOfferResponse.jobOffer.description,
            LocalDate.parse(getJobOfferResponse.jobOffer.startDate),
            LocalDate.parse(getJobOfferResponse.jobOffer.endDate),
            getJobOfferResponse.jobOffer.geographicArea,
            Job(
                getJobOfferResponse.jobOffer.job.id,
                getJobOfferResponse.jobOffer.job.title,
                getJobOfferResponse.jobOffer.job.category
            ),
            Company(
                getJobOfferResponse.jobOffer.company.id,
                getJobOfferResponse.jobOffer.company.name
            ),
            getJobOfferResponse.jobOffer.salary,
            getJobOfferResponse.jobOffer.status
        )
    }
}
