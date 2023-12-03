package com.linkedout.jobs.stream.function.jobs

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.jobs.service.JobService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.models.JobOuterClass
import com.linkedout.proto.services.Jobs
import org.springframework.stereotype.Component
import java.util.function.Function

@Component
class GetJobs(private val jobService: JobService) : Function<Request, Response> {
    override fun apply(t: Request): Response {
        // Get all the jobs from the database
        val responseMono = jobService.findAllWithCategory()
            .map { job ->
                JobOuterClass.Job.newBuilder()
                    .setId(job.id)
                    .setTitle(job.title)
                    .setCategory(job.category)
                    .build()
            }
            .reduce(Jobs.GetJobsResponse.newBuilder()) { builder, job ->
                builder.addJobs(job)
                builder
            }
            .map { builder ->
                builder.build()
            }

        // Block until the response is ready
        val response = try {
            responseMono.block()
        } catch (e: Exception) {
            return RequestResponseFactory.newFailedResponse(e.message ?: "Unknown error").build()
        }
            ?: return RequestResponseFactory.newSuccessfulResponse()
                .setGetJobsResponse(Jobs.GetJobsResponse.getDefaultInstance())
                .build()

        return RequestResponseFactory.newSuccessfulResponse()
            .setGetJobsResponse(response)
            .build()
    }
}
