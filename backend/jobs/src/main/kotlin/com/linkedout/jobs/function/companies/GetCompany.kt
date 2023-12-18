package com.linkedout.jobs.function.companies

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.jobs.converter.companies.CompanyToProto
import com.linkedout.jobs.service.CompanyService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Jobs
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
import java.util.UUID
import java.util.function.Function

@Component
class GetCompany(private val companyService: CompanyService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Get the company from the database
        val reactiveResponse = companyService.findOne(UUID.fromString(t.getCompanyRequest.id))
            .map { company ->
                CompanyToProto().convert(company)
            }
            .map { company ->
                Jobs.GetCompanyResponse.newBuilder()
                    .setCompany(company)
                    .build()
            }
        // Block until the response is ready
        val response = reactiveResponse.block()
            ?: return RequestResponseFactory.newFailedResponse("Company not found", HttpStatus.NOT_FOUND).build()

        return RequestResponseFactory.newSuccessfulResponse()
            .setGetCompanyResponse(response)
            .build()
    }
}
