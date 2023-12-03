package com.linkedout.jobs.function.jobCategories

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.jobs.service.JobCategoryService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.models.JobCategoryOuterClass
import com.linkedout.proto.services.Jobs
import org.springframework.stereotype.Component
import java.util.function.Function

@Component
class GetJobCategories(private val jobCategoryService: JobCategoryService) : Function<Request, Response> {
    override fun apply(t: Request): Response {
        // Get all the job categories from the database
        val responseMono = jobCategoryService.findAll()
            .map { jobCategory ->
                JobCategoryOuterClass.JobCategory.newBuilder()
                    .setId(jobCategory.id.toString())
                    .setCategory(jobCategory.title)
                    .build()
            }
            .reduce(Jobs.GetJobCategoriesResponse.newBuilder()) { builder, jobCategory ->
                builder.addCategories(jobCategory)
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
                .setGetJobCategoriesResponse(Jobs.GetJobCategoriesResponse.getDefaultInstance())
                .build()

        return RequestResponseFactory.newSuccessfulResponse()
            .setGetJobCategoriesResponse(response)
            .build()
    }
}