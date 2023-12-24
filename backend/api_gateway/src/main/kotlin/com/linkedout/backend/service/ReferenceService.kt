package com.linkedout.backend.service

import com.linkedout.backend.converter.reference.CreateReferenceDtoToProto
import com.linkedout.backend.converter.reference.UpdateReferenceDtoToProto
import com.linkedout.backend.dto.reference.CreateReferenceDto
import com.linkedout.backend.dto.reference.UpdateReferenceDto
import com.linkedout.backend.model.Address
import com.linkedout.backend.model.Company
import com.linkedout.backend.model.Reference
import com.linkedout.common.service.NatsService
import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.proto.models.ReferenceOuterClass
import com.linkedout.proto.services.Profile
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service

@Service
class ReferenceService(
    private val natsService: NatsService,
    private val companyService: CompanyService,
    @Value("\${app.services.reference.subjects.createOneOfUser}") private val createOneOfUserSubject: String,
    @Value("\${app.services.reference.subjects.deleteOneOfUser}") private val deleteOneOfUserSubject: String,
    @Value("\${app.services.reference.subjects.findAllOfUser}") private val findAllOfUserSubject: String,
    @Value("\${app.services.reference.subjects.findOneOfUser}") private val findOneOfUserSubject: String,
    @Value("\${app.services.reference.subjects.updateOneOfUser}") private val updateOneOfUserSubject: String
) {
    fun findAllOfUser(requestId: String, userId: String): List<Reference> {
        // Request references from the profile service
        val request = RequestResponseFactory.newRequest(requestId)
            .setGetUserReferencesRequest(
                Profile.GetUserReferencesRequest.newBuilder()
                    .setUserId(userId)
            )
            .build()

        val response = natsService.requestWithReply(findAllOfUserSubject, request)

        // Handle the response
        if (!response.hasGetUserReferencesResponse()) {
            throw Exception("Invalid response")
        }

        val getUserReferencesResponse = response.getUserReferencesResponse

        // Get the companies
        val companyIds = getUserReferencesResponse.referencesList
            .map { it.companyId }
            .toSet()

        val companies = companyService.findMultiple(requestId, companyIds)
        val companiesById = companies.associateBy { it.id }

        return getUserReferencesResponse.referencesList
            .map { reference ->
                convertReferenceFromProto(
                    reference,
                    companiesById.getOrDefault(reference.companyId, Company(reference.companyId, ""))
                )
            }
    }

    fun createOneOfUser(requestId: String, userId: String, dto: CreateReferenceDto): Reference {
        // Ensure the company exists
        val company = companyService.ensureExists(requestId, dto.company.name)

        // Create the reference using the profile service
        val request = RequestResponseFactory.newRequest(requestId)
            .setCreateUserReferenceRequest(
                Profile.CreateUserReferenceRequest.newBuilder()
                    .setUserId(userId)
                    .setReference(
                        CreateReferenceDtoToProto()
                            .convert(dto)
                            .setCompanyId(company.id)
                    )
            )
            .build()

        val response = natsService.requestWithReply(createOneOfUserSubject, request)

        // Handle the response
        if (!response.hasCreateUserReferenceResponse()) {
            throw Exception("Invalid response")
        }

        val createUserReferenceResponse = response.createUserReferenceResponse
        return convertReferenceFromProto(createUserReferenceResponse.reference, company)
    }

    fun updateOneOfUser(requestId: String, userId: String, referenceId: String, dto: UpdateReferenceDto): Reference {
        // Ensure the company exists
        var company = if (dto.company != null) companyService.ensureExists(requestId, dto.company.name) else null

        // Update the reference using the profile service
        val updateReferenceDtoBuilder = UpdateReferenceDtoToProto().convert(dto)
        if (company != null) updateReferenceDtoBuilder.setCompanyId(company.id)

        val request = RequestResponseFactory.newRequest(requestId)
            .setUpdateUserReferenceRequest(
                Profile.UpdateUserReferenceRequest.newBuilder()
                    .setUserId(userId)
                    .setReferenceId(referenceId)
                    .setReference(updateReferenceDtoBuilder)
            )
            .build()

        val response = natsService.requestWithReply(updateOneOfUserSubject, request)

        // Handle the response
        if (!response.hasUpdateUserReferenceResponse()) {
            throw Exception("Invalid response")
        }

        val updateUserReferenceResponse = response.updateUserReferenceResponse
        if (company == null) company = companyService.findOne(requestId, updateUserReferenceResponse.reference.companyId)

        return convertReferenceFromProto(updateUserReferenceResponse.reference, company)
    }

    fun findOneOfUser(requestId: String, userId: String, referenceId: String): Reference {
        // Request the reference from the profile service
        val request = RequestResponseFactory.newRequest(requestId)
            .setGetUserReferenceRequest(
                Profile.GetUserReferenceRequest.newBuilder()
                    .setUserId(userId)
                    .setReferenceId(referenceId)
            )
            .build()

        val response = natsService.requestWithReply(findOneOfUserSubject, request)

        // Handle the response
        if (!response.hasGetUserReferenceResponse()) {
            throw Exception("Invalid response")
        }

        val getUserReferenceResponse = response.getUserReferenceResponse
        val company = companyService.findOne(requestId, getUserReferenceResponse.reference.companyId)

        return convertReferenceFromProto(getUserReferenceResponse.reference, company)
    }

    fun deleteOneOfUser(requestId: String, userId: String, referenceId: String) {
        // Delete the reference using the profile service
        val request = RequestResponseFactory.newRequest(requestId)
            .setDeleteUserReferenceRequest(
                Profile.DeleteUserReferenceRequest.newBuilder()
                    .setUserId(userId)
                    .setReferenceId(referenceId)
            )
            .build()

        val response = natsService.requestWithReply(deleteOneOfUserSubject, request)

        // Handle the response
        if (!response.hasDeleteUserReferenceResponse()) {
            throw Exception("Invalid response")
        }
    }

    private fun convertReferenceFromProto(source: ReferenceOuterClass.Reference, company: Company): Reference {
        return Reference(
            source.id,
            source.firstName,
            source.lastName,
            Address(
                source.address.firstLine,
                source.address.zipCode,
                source.address.city
            ),
            source.phone,
            source.email,
            company
        )
    }
}
