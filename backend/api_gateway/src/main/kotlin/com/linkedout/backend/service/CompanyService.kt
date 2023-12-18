package com.linkedout.backend.service

import com.linkedout.backend.model.Company
import com.linkedout.common.service.NatsService
import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.proto.models.CompanyOuterClass
import com.linkedout.proto.services.Jobs.GetCompanyRequest
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service

@Service
class CompanyService(
    private val natsService: NatsService,
    @Value("\${app.services.companies.subjects.findAll}") private val findAllSubject: String,
    @Value("\${app.services.companies.subjects.findOne}") private val findOneSubject: String
) {
    fun findAll(requestId: String): List<Company> {
        // Request companies from the jobs service
        val response = natsService.requestWithReply(findAllSubject, RequestResponseFactory.newRequest(requestId).build())

        // Handle the response
        if (!response.hasGetCompaniesResponse()) {
            throw Exception("Invalid response")
        }

        val getCompaniesResponse = response.getCompaniesResponse

        return getCompaniesResponse.companiesList
            .map { company ->
                convertCompanyFromProto(company)
            }
    }

    fun findOne(requestId: String, id: String): Company {
        // Request company from the jobs service
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
        return convertCompanyFromProto(getCompany.company)
    }

    private fun convertCompanyFromProto(source: CompanyOuterClass.Company): Company {
        return Company(source.id, source.name)
    }
}
