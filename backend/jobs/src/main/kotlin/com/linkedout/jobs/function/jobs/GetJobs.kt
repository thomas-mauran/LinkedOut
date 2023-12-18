package com.linkedout.jobs.function.jobs

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.jobs.converter.jobs.JobWithCategoryToProto
import com.linkedout.jobs.service.JobService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Jobs
import org.springframework.stereotype.Component
import java.util.function.Function

@Component
class GetJobs(private val jobService: JobService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Get all the jobs from the database
        val reactiveResponse = jobService.findAllWithCategory()
            .map { job ->
                JobWithCategoryToProto().convert(job)
            }
            .reduce(Jobs.GetJobsResponse.newBuilder()) { builder, job ->
                builder.addJobs(job)
                builder
            }
            .map { builder ->
                builder.build()
            }

        // Block until the response is ready
        val response = reactiveResponse.block()
            ?: return RequestResponseFactory.newSuccessfulResponse()
                .setGetJobsResponse(Jobs.GetJobsResponse.getDefaultInstance())
                .build()

        return RequestResponseFactory.newSuccessfulResponse()
            .setGetJobsResponse(response)
            .build()
    }
}
