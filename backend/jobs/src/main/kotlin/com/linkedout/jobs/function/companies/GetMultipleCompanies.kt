package com.linkedout.jobs.function.companies

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.jobs.converter.companies.CompanyToProto
import com.linkedout.jobs.service.CompanyService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Jobs.GetMultipleCompaniesResponse
import org.springframework.stereotype.Component
import java.util.UUID
import java.util.function.Function

@Component
class GetMultipleCompanies(private val companyService: CompanyService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Extract the request
        val request = t.getMultipleCompaniesRequest
        val companyIds = request
            .idsList
            .map(UUID::fromString)

        // Get the requested companies from the database
        val reactiveResponse = companyService.findMultiple(companyIds)
            .map { company ->
                CompanyToProto().convert(company)
            }
            .reduce(GetMultipleCompaniesResponse.newBuilder()) { builder, company ->
                builder.addCompanies(company)
                builder
            }
            .map { builder ->
                builder.build()
            }

        // Block until the response is ready
        val response = reactiveResponse.block()
            ?: return RequestResponseFactory.newSuccessfulResponse()
                .setGetMultipleCompaniesResponse(GetMultipleCompaniesResponse.getDefaultInstance())
                .build()

        return RequestResponseFactory.newSuccessfulResponse()
            .setGetMultipleCompaniesResponse(response)
            .build()
    }
}
