package com.linkedout.employer.function.employer

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.employer.service.EmployerService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.models.EmployerOuterClass
import com.linkedout.proto.services.Employer.GetEmployerResponse
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
import java.util.UUID
import java.util.function.Function

@Component
class GetEmployer(private val employerService: EmployerService) : Function<Request, Response> {
    override fun apply(t: Request): Response {
        // Get the employer from the database
        val responseMono = employerService.findOne(UUID.fromString(t.getEmployerRequest.id))
            .map { employer ->
                EmployerOuterClass.Employer.newBuilder()
                    .setId(employer.id.toString())
                    .setFirstName(employer.firstName)
                    .setLastName(employer.lastName)
                    .setPicture(employer.picture)
                    .setPhone(employer.phone)
                    .build()
            }
            .map { employer ->
                GetEmployerResponse.newBuilder()
                    .setEmployer(employer)
                    .build()
            }

        // Block until the response is ready
        val response = try {
            responseMono.block()
        } catch (e: Exception) {
            return RequestResponseFactory.newFailedResponse(e.message ?: "Unknown error").build()
        }
            ?: return RequestResponseFactory.newFailedResponse("Employer not found", HttpStatus.NOT_FOUND).build()

        return RequestResponseFactory.newSuccessfulResponse()
            .setGetEmployerResponse(response)
            .build()
    }
}
