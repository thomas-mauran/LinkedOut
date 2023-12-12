package com.linkedout.jobs.function.jobs

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.jobs.service.JobService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.models.JobOuterClass
import com.linkedout.proto.services.Jobs
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
import java.util.UUID
import java.util.function.Function

@Component
class GetJob(private val jobService: JobService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Get the job from the database
        val reactiveResponse = jobService.findOneWithCategory(UUID.fromString(t.getJobRequest.id))
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
        val response = reactiveResponse.block()
            ?: return RequestResponseFactory.newFailedResponse("Job not found", HttpStatus.NOT_FOUND).build()

        return RequestResponseFactory.newSuccessfulResponse()
            .setGetJobResponse(response)
            .build()
    }
}
