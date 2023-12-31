package com.linkedout.employer.function.employer

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.employer.converter.employer.EmployerToProto
import com.linkedout.employer.service.EmployerService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Employer.GetEmployerResponse
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
import java.util.UUID
import java.util.function.Function

@Component
class GetEmployer(private val employerService: EmployerService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Get the employer from the database
        val reactiveResponse = employerService.findOne(UUID.fromString(t.getEmployerRequest.id))
            .map { employer ->
                EmployerToProto().convert(employer)
            }
            .map { employer ->
                GetEmployerResponse.newBuilder()
                    .setEmployer(employer)
                    .build()
            }

        // Block until the response is ready
        val response = reactiveResponse.block()
            ?: return RequestResponseFactory.newFailedResponse("Employer not found", HttpStatus.NOT_FOUND).build()

        return RequestResponseFactory.newSuccessfulResponse()
            .setGetEmployerResponse(response)
            .build()
    }
}
