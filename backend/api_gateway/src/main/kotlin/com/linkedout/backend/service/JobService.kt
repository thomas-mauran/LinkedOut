package com.linkedout.backend.service

import com.linkedout.backend.model.Job
import com.linkedout.common.service.NatsService
import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.proto.dto.job.CreateJobDtoOuterClass.CreateJobDto
import com.linkedout.proto.models.JobOuterClass
import com.linkedout.proto.services.Jobs
import com.linkedout.proto.services.Jobs.GetJobRequest
import com.linkedout.proto.services.Recommendations.CreateJobRequest
import com.linkedout.proto.services.Recommendations.CreateJobResponse
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service

@Service
class JobService(
    private val natsService: NatsService,
    @Value("\${app.services.jobs.subjects.findAll}") private val findAllSubject: String,
    @Value("\${app.services.jobs.subjects.findMultiple}") private val findMultipleSubject: String,
    @Value("\${app.services.jobs.subjects.findOne}") private val findOneSubject: String,
    @Value("\${app.services.recommendation.subjects.createJob}") private val createJobSubject: String
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


        // request for neo4j service
        val request2 = RequestResponseFactory.newRequest(requestId)
            .setCreateJobRequest(
                CreateJobRequest.newBuilder().setJob(CreateJobDto.newBuilder().setId("a764fdee-41f8-42f4-a140-038807b70a90").setCategory("Category").setTitle("Title"))
            )
            .build()
        val response2 = natsService.requestWithReply(createJobSubject, request2)
        println(response2)

        return convertJobFromProto(getJobResponse.job)
    }

    private fun convertJobFromProto(source: JobOuterClass.Job): Job {
        return Job(source.id, source.title, source.category)
    }
}
