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
import java.util.function.Function

@Component
class EnsureCompanyExists(private val companyService: CompanyService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Ensure the company exists in the database
        val reactiveResponse = companyService.ensureExists(t.ensureCompanyRequest.name)
            .map { company ->
                CompanyToProto().convert(company)
            }
            .map { company ->
                Jobs.EnsureCompanyResponse.newBuilder()
                    .setCompany(company)
                    .build()
            }
        // Block until the response is ready
        val response = reactiveResponse.block()
            ?: return RequestResponseFactory.newFailedResponse("An unknown error has occurred", HttpStatus.INTERNAL_SERVER_ERROR).build()

        return RequestResponseFactory.newSuccessfulResponse()
            .setEnsureCompanyResponse(response)
            .build()
    }
}
