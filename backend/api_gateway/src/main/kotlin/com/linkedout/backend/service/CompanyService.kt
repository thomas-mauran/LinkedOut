package com.linkedout.backend.service

import com.linkedout.backend.model.Company
import com.linkedout.common.service.NatsService
import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.proto.services.Jobs.GetCompanyRequest
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux

@Service
class CompanyService(
    private val natsService: NatsService,
    @Value("\${app.services.companies.subjects.findAll}") private val findAllSubject: String,
    @Value("\${app.services.companies.subjects.findOne}") private val findOneSubject: String
) {
    fun findAll(requestId: String): Flux<Company> {
        // Request companies from the jobs service
        val response = natsService.requestWithReply(findAllSubject, RequestResponseFactory.newRequest(requestId).build())

        // Handle the response
        if (!response.hasGetCompaniesResponse()) {
            throw Exception("Invalid response")
        }

        val getCompaniesResponse = response.getCompaniesResponse

        return Flux.fromIterable(getCompaniesResponse.companiesList)
            .map { company ->
                Company(company.id, company.name)
            }
    }

    fun findOne(requestId: String, id: String): Company {
        // Request compagny from the jobs service
        val request = RequestResponseFactory.newRequest(requestId)
            .setGetCompanyRequest(
                GetCompanyRequest.newBuilder()
                    .setId(id)
            )
            .build()

        val response = natsService.requestWithReply(findOneSubject, request)

        // Handle the response
        if (!response.hasGetCompanyResponse()) {
            throw Exception("Invalid response")
        }

        val getCompany = response.getCompanyResponse
        return Company(getCompany.company.id, getCompany.company.name)
    }
}
