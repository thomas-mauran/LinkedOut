package com.linkedout.jobs.function.jobCategories

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.jobs.converter.jobCategories.JobCategoryToProto
import com.linkedout.jobs.service.JobCategoryService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Jobs
import org.springframework.stereotype.Component
import java.util.function.Function

@Component
class GetJobCategories(private val jobCategoryService: JobCategoryService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Get all the job categories from the database
        val reactiveResponse = jobCategoryService.findAll()
            .map { jobCategory ->
                JobCategoryToProto().convert(jobCategory)
            }
            .reduce(Jobs.GetJobCategoriesResponse.newBuilder()) { builder, jobCategory ->
                builder.addCategories(jobCategory)
                builder
            }
            .map { builder ->
                builder.build()
            }

        // Block until the response is ready
        val response = reactiveResponse.block()
            ?: return RequestResponseFactory.newSuccessfulResponse()
                .setGetJobCategoriesResponse(Jobs.GetJobCategoriesResponse.getDefaultInstance())
                .build()

        return RequestResponseFactory.newSuccessfulResponse()
            .setGetJobCategoriesResponse(response)
            .build()
    }
}
