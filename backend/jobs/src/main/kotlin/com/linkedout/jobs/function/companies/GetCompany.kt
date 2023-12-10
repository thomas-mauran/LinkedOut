package com.linkedout.jobs.function.companies

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.jobs.service.CompanyService
import com.linkedout.jobs.service.JobService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.models.CompanyOuterClass
import com.linkedout.proto.models.JobOuterClass
import com.linkedout.proto.services.Jobs
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
import java.util.UUID
import java.util.function.Function

@Component
class GetCompany(private val companyService: CompanyService) : Function<Request, Response> {
    override fun apply(t: Request): Response {
        // Get the company from the database
        val responseMono = companyService.findOne(UUID.fromString(t.getCompanyRequest.id))
            .map { company ->
                CompanyOuterClass.Company.newBuilder()
                    .setId(company.id.toString())
                    .setName(company.name)
                    .build()
            }
            .map { company ->
                Jobs.GetCompanyResponse.newBuilder()
                    .setCompany(company)
                    .build()
            }
        // Block until the response is ready
        val response = try {
            responseMono.block()
        } catch (e: Exception) {
            return RequestResponseFactory.newFailedResponse(e.message ?: "Unknown error").build()
        }
            ?: return RequestResponseFactory.newFailedResponse("Company not found", HttpStatus.NOT_FOUND).build()

        return RequestResponseFactory.newSuccessfulResponse()
            .setGetCompanyResponse(response)
            .build()
    }
}
