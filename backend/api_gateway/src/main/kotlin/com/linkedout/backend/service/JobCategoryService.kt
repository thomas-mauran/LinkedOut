package com.linkedout.backend.service

import com.linkedout.backend.model.JobCategory
import com.linkedout.common.service.NatsService
import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.proto.models.JobCategoryOuterClass
import com.linkedout.proto.services.Jobs
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service

@Service
class JobCategoryService(
    private val natsService: NatsService,
    @Value("\${app.services.jobCategories.subjects.findAll}") private val findAllSubject: String,
    @Value("\${app.services.jobCategories.subjects.findMultiple}") private val findMultipleSubject: String,
    @Value("\${app.services.jobCategories.subjects.findOne}") private val findOneSubject: String
) {
    fun findAll(requestId: String): List<JobCategory> {
        // Request job categories from the jobs service
        val response = natsService.requestWithReply(findAllSubject, RequestResponseFactory.newRequest(requestId).build())

        // Handle the response
        if (!response.hasGetJobCategoriesResponse()) {
            throw Exception("Invalid response")
        }

        val getJobCategoriesResponse = response.getJobCategoriesResponse

        return getJobCategoriesResponse.categoriesList.map { jobCategory ->
            convertJobCategoryFromProto(jobCategory)
        }
    }

    fun findMultiple(requestId: String, ids: Iterable<String>): List<JobCategory> {
        // Request the job categories from the jobs service
        val request = RequestResponseFactory.newRequest(requestId)
            .setGetMultipleJobCategoriesRequest(
                Jobs.GetMultipleJobCategoriesRequest.newBuilder()
                    .addAllIds(ids)
            )
            .build()

        val response = natsService.requestWithReply(findMultipleSubject, request)

        // Handle the response
        if (!response.hasGetMultipleJobCategoriesResponse()) {
            throw Exception("Invalid response")
        }

        val getMultipleJobCategoriesResponse = response.getMultipleJobCategoriesResponse
        return getMultipleJobCategoriesResponse.categoriesList.map { jobCategory ->
            convertJobCategoryFromProto(jobCategory)
        }
    }

    fun findOne(requestId: String, id: String): JobCategory {
        // Request the job category from the jobs service
        val request = RequestResponseFactory.newRequest(requestId)
            .setGetJobCategoryRequest(
                Jobs.GetJobCategoryRequest.newBuilder()
                    .setId(id)
            )
            .build()

        val response = natsService.requestWithReply(findOneSubject, request)

        // Handle the response
        if (!response.hasGetJobCategoryResponse()) {
            throw Exception("Invalid response")
        }

        val getJobCategoryResponse = response.getJobCategoryResponse
        return convertJobCategoryFromProto(getJobCategoryResponse.category)
    }

    private fun convertJobCategoryFromProto(source: JobCategoryOuterClass.JobCategory): JobCategory {
        return JobCategory(source.id, source.category)
    }
}
