package com.linkedout.recommendation.function.jobOffers

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Recommendations
import com.linkedout.recommendation.converter.job.CreateJobEntityFromProto
import com.linkedout.recommendation.converter.job.JobToProto
import com.linkedout.recommendation.service.JobService
import org.springframework.stereotype.Component
import java.util.function.Function

@Component
class CreateJob(private val jobService: JobService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Extract the request
        val request = t.createJobRequest
        val requestDto = CreateJobEntityFromProto().convert(request.job)

        // Create the job
        val reactiveResponse = jobService.saveJob(requestDto)
            .map { job ->
                JobToProto().convert(job)
            }
            .map { job ->
                Recommendations.CreateJobResponse.newBuilder()
                    .setJob(job)
                    .build()
            }

        // Block until the response is ready
        val response = reactiveResponse.block()

        return RequestResponseFactory.newSuccessfulResponse()
            .setCreateJobResponse(response)
            .build()
    }
}
