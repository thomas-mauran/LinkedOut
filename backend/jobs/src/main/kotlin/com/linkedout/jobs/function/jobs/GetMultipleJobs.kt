package com.linkedout.jobs.function.jobs

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.jobs.converter.jobs.JobWithCategoryToProto
import com.linkedout.jobs.service.JobService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Jobs.GetMultipleJobsResponse
import org.springframework.stereotype.Component
import java.util.UUID
import java.util.function.Function

@Component
class GetMultipleJobs(private val jobService: JobService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Extract the request
        val request = t.getMultipleJobsRequest
        val jobIds = request
            .idsList
            .map(UUID::fromString)

        // Get the requested jobs from the database
        val reactiveResponse = jobService.findMultipleWithCategory(jobIds)
            .map { job ->
                JobWithCategoryToProto().convert(job)
            }
            .reduce(GetMultipleJobsResponse.newBuilder()) { builder, job ->
                builder.addJobs(job)
                builder
            }
            .map { builder ->
                builder.build()
            }

        // Block until the response is ready
        val response = reactiveResponse.block()
            ?: return RequestResponseFactory.newSuccessfulResponse()
                .setGetMultipleJobsResponse(GetMultipleJobsResponse.getDefaultInstance())
                .build()

        return RequestResponseFactory.newSuccessfulResponse()
            .setGetMultipleJobsResponse(response)
            .build()
    }
}
