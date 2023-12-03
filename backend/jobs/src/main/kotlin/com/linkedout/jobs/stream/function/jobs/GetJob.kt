package com.linkedout.jobs.stream.function.jobs

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.jobs.service.JobService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.models.JobOuterClass
import com.linkedout.proto.services.Jobs
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
import java.util.*
import java.util.function.Function

@Component
class GetJob(private val jobService: JobService) : Function<Request, Response> {
    override fun apply(t: Request): Response {
        // Get the job from the database
        val responseMono = jobService.findOneWithCategory(UUID.fromString(t.getGetJobRequest().id))
            .map { job ->
                JobOuterClass.Job.newBuilder()
                    .setId(job.id)
                    .setTitle(job.title)
                    .setCategory(job.category)
                    .build()
            }
            .map { job ->
                Jobs.GetJobResponse.newBuilder()
                    .setJob(job)
                    .build()
            }

        // Block until the response is ready
        val response = try {
            responseMono.block()
        } catch (e: Exception) {
            return RequestResponseFactory.newFailedResponse(e.message ?: "Unknown error").build()
        }
            ?: return RequestResponseFactory.newFailedResponse("Job not found", HttpStatus.NOT_FOUND).build()

        return RequestResponseFactory.newSuccessfulResponse()
            .setGetJobResponse(response)
            .build()
    }
}
