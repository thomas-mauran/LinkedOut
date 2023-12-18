package com.linkedout.backend.service

import com.linkedout.backend.model.Company
import com.linkedout.backend.model.Job
import com.linkedout.backend.model.JobOffer
import com.linkedout.common.service.NatsService
import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.proto.models.JobOfferOuterClass
import com.linkedout.proto.services.Jobs
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.time.LocalDate

@Service
class JobOfferService(
    private val natsService: NatsService,
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
            convertJobOfferFromProto(jobOffer)
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
        return convertJobOfferFromProto(getJobOfferResponse.jobOffer)
    }

    private fun convertJobOfferFromProto(source: JobOfferOuterClass.JobOffer): JobOffer {
        return JobOffer(
            source.id,
            source.title,
            source.description,
            LocalDate.parse(source.startDate),
            LocalDate.parse(source.endDate),
            source.geographicArea,
            Job(
                source.job.id,
                source.job.title,
                source.job.category
            ),
            Company(
                source.company.id,
                source.company.name
            ),
            source.salary,
            source.status
        )
    }
}
