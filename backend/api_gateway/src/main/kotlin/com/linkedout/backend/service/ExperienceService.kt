package com.linkedout.backend.service

import com.linkedout.backend.converter.experience.CreateExperienceDtoToProto
import com.linkedout.backend.converter.experience.UpdateExperienceDtoToProto
import com.linkedout.backend.dto.experience.CreateExperienceDto
import com.linkedout.backend.dto.experience.UpdateExperienceDto
import com.linkedout.backend.model.Address
import com.linkedout.backend.model.Company
import com.linkedout.backend.model.Experience
import com.linkedout.backend.model.Job
import com.linkedout.common.service.NatsService
import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.proto.models.ExperienceOuterClass
import com.linkedout.proto.services.Profile
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.time.format.DateTimeFormatter
import java.util.*

@Service
class ExperienceService(
    private val natsService: NatsService,
    private val companyService: CompanyService,
    private val jobService: JobService,
    @Value("\${app.services.experience.subjects.createOneOfUser}") private val createOneOfUserSubject: String,
    @Value("\${app.services.experience.subjects.deleteOneOfUser}") private val deleteOneOfUserSubject: String,
    @Value("\${app.services.experience.subjects.findAllOfUser}") private val findAllOfUserSubject: String,
    @Value("\${app.services.experience.subjects.findOneOfUser}") private val findOneOfUserSubject: String,
    @Value("\${app.services.experience.subjects.updateOneOfUser}") private val updateOneOfUserSubject: String
) {
    fun findAllOfUser(requestId: String, userId: String): List<Experience> {
        // Request experiences from the profile service
        val request = RequestResponseFactory.newRequest(requestId)
            .setGetUserExperiencesRequest(
                Profile.GetUserExperiencesRequest.newBuilder()
                    .setUserId(userId)
            )
            .build()

        val response = natsService.requestWithReply(findAllOfUserSubject, request)

        // Handle the response
        if (!response.hasGetUserExperiencesResponse()) {
            throw Exception("Invalid response")
        }

        val getUserExperiencesResponse = response.getUserExperiencesResponse

        // Get the companies
        val companyIds = getUserExperiencesResponse.experiencesList
            .map { it.companyId }
            .toSet()

        val companies = companyService.findMultiple(requestId, companyIds)
        val companiesById = companies.associateBy { it.id }

        // Get the jobs
        val jobIds = getUserExperiencesResponse.experiencesList
            .map { it.jobId }
            .toSet()

        val jobs = jobService.findMultiple(requestId, jobIds)
        val jobsById = jobs.associateBy { it.id }

        return getUserExperiencesResponse.experiencesList
            .map { experience ->
                convertExperienceFromProto(
                    experience,
                    companiesById.getOrDefault(experience.companyId, Company(experience.companyId, "")),
                    jobsById.getOrDefault(experience.jobId, Job(experience.jobId, "", ""))
                )
            }
    }

    fun createOneOfUser(requestId: String, userId: String, dto: CreateExperienceDto): Experience {
        // Ensure the company exists and get the job
        val company = companyService.ensureExists(requestId, dto.company.name)
        val job = jobService.findOne(requestId, dto.jobId)

        // Create the experience using the profile service
        val request = RequestResponseFactory.newRequest(requestId)
            .setCreateUserExperienceRequest(
                Profile.CreateUserExperienceRequest.newBuilder()
                    .setUserId(userId)
                    .setExperience(
                        CreateExperienceDtoToProto()
                            .convert(dto)
                            .setCompanyId(company.id)
                            .setJobId(job.id)
                    )
            )
            .build()

        val response = natsService.requestWithReply(createOneOfUserSubject, request)

        // Handle the response
        if (!response.hasCreateUserExperienceResponse()) {
            throw Exception("Invalid response")
        }

        val createUserExperienceResponse = response.createUserExperienceResponse
        return convertExperienceFromProto(createUserExperienceResponse.experience, company, job)
    }

    fun updateOneOfUser(requestId: String, userId: String, experienceId: String, dto: UpdateExperienceDto): Experience {
        // Ensure the company exists and get the job if it's not null
        var company = if (dto.company != null) companyService.ensureExists(requestId, dto.company.name) else null
        var job = if (dto.jobId != null) jobService.findOne(requestId, dto.jobId) else null

        // Update the experience using the profile service
        val updateExperienceDtoBuilder = UpdateExperienceDtoToProto().convert(dto)
        if (company != null) updateExperienceDtoBuilder.setCompanyId(company.id)
        if (job != null) updateExperienceDtoBuilder.setJobId(job.id)

        val request = RequestResponseFactory.newRequest(requestId)
            .setUpdateUserExperienceRequest(
                Profile.UpdateUserExperienceRequest.newBuilder()
                    .setUserId(userId)
                    .setExperienceId(experienceId)
                    .setExperience(updateExperienceDtoBuilder)
            )
            .build()

        val response = natsService.requestWithReply(updateOneOfUserSubject, request)

        // Handle the response
        if (!response.hasUpdateUserExperienceResponse()) {
            throw Exception("Invalid response")
        }

        val updateUserExperienceResponse = response.updateUserExperienceResponse

        if (company == null) company = companyService.findOne(requestId, updateUserExperienceResponse.experience.companyId)
        if (job == null) job = jobService.findOne(requestId, updateUserExperienceResponse.experience.jobId)

        return convertExperienceFromProto(updateUserExperienceResponse.experience, company, job)
    }

    fun findOneOfUser(requestId: String, userId: String, experienceId: String): Experience {
        // Request the experience from the profile service
        val request = RequestResponseFactory.newRequest(requestId)
            .setGetUserExperienceRequest(
                Profile.GetUserExperienceRequest.newBuilder()
                    .setUserId(userId)
                    .setExperienceId(experienceId)
            )
            .build()

        val response = natsService.requestWithReply(findOneOfUserSubject, request)

        // Handle the response
        if (!response.hasGetUserExperienceResponse()) {
            throw Exception("Invalid response")
        }

        val getUserExperienceResponse = response.getUserExperienceResponse
        val company = companyService.findOne(requestId, getUserExperienceResponse.experience.companyId)
        val job = jobService.findOne(requestId, getUserExperienceResponse.experience.jobId)

        return convertExperienceFromProto(getUserExperienceResponse.experience, company, job)
    }

    fun deleteOneOfUser(requestId: String, userId: String, experienceId: String) {
        // Delete the experience using the profile service
        val request = RequestResponseFactory.newRequest(requestId)
            .setDeleteUserExperienceRequest(
                Profile.DeleteUserExperienceRequest.newBuilder()
                    .setUserId(userId)
                    .setExperienceId(experienceId)
            )
            .build()

        val response = natsService.requestWithReply(deleteOneOfUserSubject, request)

        // Handle the response
        if (!response.hasDeleteUserExperienceResponse()) {
            throw Exception("Invalid response")
        }
    }

    private fun convertExperienceFromProto(source: ExperienceOuterClass.Experience, company: Company, job: Job): Experience {
        val startDate = Date(source.startDate)
        val endDate = Date(source.endDate)

        return Experience(
            source.id,
            DateTimeFormatter.ISO_INSTANT.format(startDate.toInstant()),
            DateTimeFormatter.ISO_INSTANT.format(endDate.toInstant()),
            Address(
                source.address.firstLine,
                source.address.zipCode,
                source.address.city
            ),
            company,
            job
        )
    }
}
