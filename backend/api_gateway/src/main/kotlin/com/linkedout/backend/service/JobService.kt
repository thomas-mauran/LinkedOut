package com.linkedout.backend.service

import com.linkedout.backend.model.Job
import com.linkedout.common.service.NatsService
import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.proto.dto.job.CreateJobDtoOuterClass.CreateJobDto
import com.linkedout.proto.models.JobOuterClass
import com.linkedout.proto.services.Jobs
import com.linkedout.proto.services.Jobs.GetJobRequest
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service

@Service
class JobService(
    private val natsService: NatsService,
    @Value("\${app.services.jobs.subjects.findAll}") private val findAllSubject: String,
    @Value("\${app.services.jobs.subjects.findMultiple}") private val findMultipleSubject: String,
    @Value("\${app.services.jobs.subjects.findOne}") private val findOneSubject: String,
) {
    fun findAll(requestId: String): List<Job> {
        // Request jobs from the jobs service
        val response = natsService.requestWithReply(findAllSubject, RequestResponseFactory.newRequest(requestId).build())

        // Handle the response
        if (!response.hasGetJobsResponse()) {
            throw Exception("Invalid response")
        }

        val getJobsResponse = response.getJobsResponse

        return getJobsResponse.jobsList.map { job ->
            convertJobFromProto(job)
        }
    }

    fun findMultiple(requestId: String, ids: Iterable<String>): List<Job> {
        // Request the jobs from the jobs service
        val request = RequestResponseFactory.newRequest(requestId)
            .setGetMultipleJobsRequest(
                Jobs.GetMultipleJobsRequest.newBuilder()
                    .addAllIds(ids)
            )
            .build()

        val response = natsService.requestWithReply(findMultipleSubject, request)

        // Handle the response
        if (!response.hasGetMultipleJobsResponse()) {
            throw Exception("Invalid response")
        }

        val getMultipleJobsResponse = response.getMultipleJobsResponse
        return getMultipleJobsResponse.jobsList.map { job ->
            convertJobFromProto(job)
        }
    }

    fun findOne(requestId: String, id: String): Job {
        // Request jobs from the jobs service
        val request = RequestResponseFactory.newRequest(requestId)
            .setGetJobRequest(
                GetJobRequest.newBuilder()
                    .setId(id)
            )
            .build()

        val response = natsService.requestWithReply(findOneSubject, request)

        // Handle the response
        if (!response.hasGetJobResponse()) {
            throw Exception("Invalid response")
        }

        val getJobResponse = response.getJobResponse

        return convertJobFromProto(getJobResponse.job)
    }

    private fun convertJobFromProto(source: JobOuterClass.Job): Job {
        return Job(source.id, source.title, source.category)
    }
}
