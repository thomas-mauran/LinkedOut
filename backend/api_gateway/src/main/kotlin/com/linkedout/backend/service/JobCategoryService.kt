package com.linkedout.backend.service

import com.linkedout.backend.model.JobCategory
import com.linkedout.common.service.NatsService
import com.linkedout.common.utils.RequestResponseFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux

@Service
class JobCategoryService(private val natsService: NatsService, @Value("\${app.services.jobCategories.subjects.findAll}") private val findAllSubject: String) {
    fun findAll(requestId: String): Flux<JobCategory> {
        // Request job categories from the jobs service
        val response = natsService.requestWithReply(findAllSubject, RequestResponseFactory.newRequest(requestId).build())

        // Handle the response
        if (!response.hasGetJobCategoriesResponse()) {
            throw Exception("Invalid response")
        }

        val getJobCategoriesResponse = response.getGetJobCategoriesResponse()

        return Flux.fromIterable(getJobCategoriesResponse.categoriesList)
            .map { jobCategory ->
                JobCategory(jobCategory.id, jobCategory.category)
            }
    }
}
