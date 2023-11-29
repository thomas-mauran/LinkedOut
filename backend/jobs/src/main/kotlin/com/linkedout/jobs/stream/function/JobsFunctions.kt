package com.linkedout.jobs.stream.function

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.jobs.service.JobService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.models.JobOuterClass
import com.linkedout.proto.services.Jobs
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import java.util.function.Function

@Configuration
class JobsFunctions(private val jobService: JobService) {
    @Bean
    fun getJobs(): Function<Request, Response> {
        return Function {
            // Get all the jobs from the database
            val responseMono = jobService.findAllWithCategory()
                .map { job ->
                    JobOuterClass.Job.newBuilder()
                        .setId(job.id.toString())
                        .setTitle(job.title)
                        .setCategory(job.category.toString())
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
                return@Function RequestResponseFactory.newFailedResponse(e.message ?: "Unknown error").build()
            }

            // Return the response
            if (response != null) {
                RequestResponseFactory.newSuccessfulResponse()
                    .setGetJobsResponse(response)
                    .build()
            } else {
                RequestResponseFactory.newSuccessfulResponse()
                    .setGetJobsResponse(Jobs.GetJobsResponse.getDefaultInstance())
                    .build()
            }
        }
    }
}
