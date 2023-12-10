package com.linkedout.backend.service

import com.linkedout.backend.model.JobCategory
import com.linkedout.common.service.NatsService
import com.linkedout.common.utils.RequestResponseFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service

@Service
class JobCategoryService(
    private val natsService: NatsService,
    @Value("\${app.services.jobCategories.subjects.findAll}") private val findAllSubject: String
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
            JobCategory(jobCategory.id, jobCategory.category)
        }
    }
}
