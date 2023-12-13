package com.linkedout.jobs.function.companies

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.jobs.service.CompanyService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.models.CompanyOuterClass
import com.linkedout.proto.services.Jobs
import org.springframework.stereotype.Component
import java.util.function.Function

@Component
class GetCompanies(private val companyService: CompanyService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Get the companies from the database
        val reactiveResponse = companyService.findAll()
            .map { company ->
                CompanyOuterClass.Company.newBuilder()
                    .setId(company.id.toString())
                    .setName(company.name)
                    .build()
            }.reduce(Jobs.GetCompaniesResponse.newBuilder()) { builder, company ->
                builder.addCompanies(company)
                builder
            }
            .map { builder ->
                builder.build()
            }

        // Block until the response is ready
        val response = reactiveResponse.block()
            ?: return RequestResponseFactory.newSuccessfulResponse()
                .setGetCompaniesResponse(Jobs.GetCompaniesResponse.getDefaultInstance())
                .build()

        return RequestResponseFactory.newSuccessfulResponse()
            .setGetCompaniesResponse(response)
            .build()
    }
}
