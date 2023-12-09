package com.linkedout.backend.service

import com.linkedout.backend.model.Employer
import com.linkedout.common.service.NatsService
import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.proto.services.Employer.GetEmployerRequest
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service

@Service
class EmployerService(
    private val natsService: NatsService,
    @Value("\${app.services.employer.subjects.findOne}") private val findOneSubject: String
) {
    fun findOne(requestId: String, id: String): Employer {
        // Request the employer from the employer service
        val request = RequestResponseFactory.newRequest(requestId)
            .setGetEmployerRequest(
                GetEmployerRequest.newBuilder()
                    .setId(id)
            )
            .build()

        val response = natsService.requestWithReply(findOneSubject, request)

        // Handle the response
        if (!response.hasGetEmployerResponse()) {
            throw Exception("Invalid response")
        }

        val getEmployerResponse = response.getEmployerResponse
        return Employer(
            getEmployerResponse.employer.id,
            getEmployerResponse.employer.firstName,
            getEmployerResponse.employer.lastName,
            getEmployerResponse.employer.picture,
            getEmployerResponse.employer.phone
        )
    }
}
