package com.linkedout.backend.service

import com.linkedout.backend.model.Job
import com.linkedout.common.service.NatsService
import com.linkedout.common.utils.RequestResponseFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service

@Service
class JobService(private val natsService: NatsService, @Value("\${app.services.jobs.subjects.findAll}") private val findAllSubject: String) {
    fun findAll(): List<Job> {
        // Request jobs from the jobs service
        val response = natsService.requestWithReply(findAllSubject, RequestResponseFactory.newRequest().build())

        // Handle the response
        if (!response.hasGetJobsResponse()) {
            throw Exception("Invalid response")
        }

        val getJobsResponse = response.getGetJobsResponse()

        return getJobsResponse.jobsList
            .map { job ->
                Job(job.id, job.title, job.category)
            }
    }
}
