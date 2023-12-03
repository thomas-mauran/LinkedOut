package com.linkedout.backend.service

import com.linkedout.backend.model.Job
import com.linkedout.common.service.NatsService
import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.proto.services.Jobs.GetJobRequest
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Service
class JobService(private val natsService: NatsService, @Value("\${app.services.jobs.subjects.findAll}") private val findAllSubject: String, @Value("\${app.services.jobs.subjects.findOne}") private val findOneSubject: String) {
    fun findAll(requestId: String): Flux<Job> {
        // Request jobs from the jobs service
        val response = natsService.requestWithReply(findAllSubject, RequestResponseFactory.newRequest(requestId).build())

        // Handle the response
        if (!response.hasGetJobsResponse()) {
            throw Exception("Invalid response")
        }

        val getJobsResponse = response.getGetJobsResponse()

        return Flux.fromIterable(getJobsResponse.jobsList)
            .map { job ->
                Job(job.id, job.title, job.category)
            }
    }

    fun findOne(requestId: String, id: String): Mono<Job> {
        // Request jobs from the jobs service
        val request = RequestResponseFactory.newRequest(requestId)
            .setGetJobRequest(
                GetJobRequest.newBuilder()
                    .setId(id)
                    .build()
            )
            .build()

        val response = natsService.requestWithReply(findOneSubject, request)

        // Handle the response
        if (!response.hasGetJobResponse()) {
            throw Exception("Invalid response")
        }

        val getJobResponse = response.getGetJobResponse()
        return Mono.just(Job(getJobResponse.job.id, getJobResponse.job.title, getJobResponse.job.category))
    }
}
