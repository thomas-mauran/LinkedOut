package com.linkedout.employer.function.employer

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.employer.service.EmployerService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.models.EmployerOuterClass
import com.linkedout.proto.services.Employer.GetMultipleEmployersResponse
import org.springframework.stereotype.Component
import java.util.UUID
import java.util.function.Function

@Component
class GetMultipleEmployers(private val employerService: EmployerService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Get multiple employers from the database
        val ids = t.getMultipleEmployersRequest
            .idsList
            .map(UUID::fromString)

        val reactiveResponse = employerService.findMultiple(ids)
            .map { employer ->
                EmployerOuterClass.Employer.newBuilder()
                    .setId(employer.id.toString())
                    .setFirstName(employer.firstName)
                    .setLastName(employer.lastName)
                    .setPicture(employer.picture)
                    .setPhone(employer.phone)
                    .build()
            }
            .reduce(GetMultipleEmployersResponse.newBuilder()) { builder, employer ->
                builder.addEmployers(employer)
                builder
            }
            .map { builder ->
                builder.build()
            }

        // Block until the response is ready
        val response = reactiveResponse.block()
            ?: return RequestResponseFactory.newSuccessfulResponse()
                .setGetMultipleEmployersResponse(GetMultipleEmployersResponse.getDefaultInstance())
                .build()

        return RequestResponseFactory.newSuccessfulResponse()
            .setGetMultipleEmployersResponse(response)
            .build()
    }
}
