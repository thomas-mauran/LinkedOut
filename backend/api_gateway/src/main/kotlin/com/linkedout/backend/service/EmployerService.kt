package com.linkedout.backend.service

import com.linkedout.backend.converter.employer.CreateEmployerEvaluationDtoToProto
import com.linkedout.backend.dto.employer.CreateEmployerEvaluationDto
import com.linkedout.backend.model.Employer
import com.linkedout.backend.model.EmployerEvaluation
import com.linkedout.common.service.NatsService
import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.proto.models.EmployerEvaluationOuterClass
import com.linkedout.proto.models.EmployerOuterClass
import com.linkedout.proto.services.Employer.CreateEmployerEvaluationRequest
import com.linkedout.proto.services.Employer.DeleteEmployerEvaluationRequest
import com.linkedout.proto.services.Employer.GetEmployerEvaluationRequest
import com.linkedout.proto.services.Employer.GetEmployerRequest
import com.linkedout.proto.services.Employer.GetMultipleEmployersRequest
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service

@Service
class EmployerService(
    private val natsService: NatsService,
    @Value("\${app.services.employer.subjects.findOne}") private val findOneSubject: String,
    @Value("\${app.services.employer.subjects.findMultiple}") private val findMultipleSubject: String,
    @Value("\${app.services.employer.subjects.createEvaluation}") private val createEvaluationSubject: String,
    @Value("\${app.services.employer.subjects.deleteEvaluation}") private val deleteEvaluationSubject: String,
    @Value("\${app.services.employer.subjects.findOneEvaluation}") private val findOneEvaluationSubject: String
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
        return convertEmployerFromProto(getEmployerResponse.employer)
    }

    fun findMultiple(requestId: String, ids: Iterable<String>): List<Employer> {
        // Request the employers from the employer service
        val request = RequestResponseFactory.newRequest(requestId)
            .setGetMultipleEmployersRequest(
                GetMultipleEmployersRequest.newBuilder()
                    .addAllIds(ids)
            )
            .build()

        val response = natsService.requestWithReply(findMultipleSubject, request)

        // Handle the response
        if (!response.hasGetMultipleEmployersResponse()) {
            throw Exception("Invalid response")
        }

        val getMultipleEmployersResponse = response.getMultipleEmployersResponse
        return getMultipleEmployersResponse.employersList.map { employer ->
            convertEmployerFromProto(employer)
        }
    }

    fun createOneEvaluationOfUser(requestId: String, userId: String, employerId: String, dto: CreateEmployerEvaluationDto): EmployerEvaluation {
        // Create the evaluation using the employer service
        val request = RequestResponseFactory.newRequest(requestId)
            .setCreateEmployerEvaluationRequest(
                CreateEmployerEvaluationRequest.newBuilder()
                    .setUserId(userId)
                    .setEmployerId(employerId)
                    .setEvaluation(CreateEmployerEvaluationDtoToProto().convert(dto))
            )
            .build()

        val response = natsService.requestWithReply(createEvaluationSubject, request)

        // Handle the response
        if (!response.hasCreateEmployerEvaluationResponse()) {
            throw Exception("Invalid response")
        }

        val createEmployerEvaluationResponse = response.createEmployerEvaluationResponse
        return convertEvaluationFromProto(createEmployerEvaluationResponse.evaluation)
    }

    fun findOneEvaluationOfUser(requestId: String, userId: String, employerId: String): EmployerEvaluation {
        // Request the evaluation from the employer service
        val request = RequestResponseFactory.newRequest(requestId)
            .setGetEmployerEvaluationRequest(
                GetEmployerEvaluationRequest.newBuilder()
                    .setUserId(userId)
                    .setEmployerId(employerId)
            )
            .build()

        val response = natsService.requestWithReply(findOneEvaluationSubject, request)

        // Handle the response
        if (!response.hasGetEmployerEvaluationResponse()) {
            throw Exception("Invalid response")
        }

        val getEmployerEvaluationResponse = response.getEmployerEvaluationResponse
        return convertEvaluationFromProto(getEmployerEvaluationResponse.evaluation)
    }

    fun deleteOneEvaluationOfUser(requestId: String, userId: String, employerId: String) {
        // Delete the evaluation using the employer service
        val request = RequestResponseFactory.newRequest(requestId)
            .setDeleteEmployerEvaluationRequest(
                DeleteEmployerEvaluationRequest.newBuilder()
                    .setUserId(userId)
                    .setEmployerId(employerId)
            )
            .build()

        val response = natsService.requestWithReply(deleteEvaluationSubject, request)

        // Handle the response
        if (!response.hasDeleteEmployerEvaluationResponse()) {
            throw Exception("Invalid response")
        }
    }

    private fun convertEmployerFromProto(source: EmployerOuterClass.Employer): Employer {
        return Employer(
            source.id,
            source.firstName,
            source.lastName,
            source.picture,
            source.phone
        )
    }

    private fun convertEvaluationFromProto(source: EmployerEvaluationOuterClass.EmployerEvaluation): EmployerEvaluation {
        return EmployerEvaluation(
            source.id,
            source.score,
            source.comment
        )
    }
}
