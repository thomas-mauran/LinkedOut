package com.linkedout.jobs.function.jobCategories

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.jobs.converter.jobCategories.JobCategoryToProto
import com.linkedout.jobs.service.JobCategoryService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Jobs.GetMultipleJobCategoriesResponse
import org.springframework.stereotype.Component
import java.util.UUID
import java.util.function.Function

@Component
class GetMultipleJobCategories(private val jobCategoryService: JobCategoryService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Extract the request
        val request = t.getMultipleJobCategoriesRequest
        val jobCategoryIds = request
            .idsList
            .map(UUID::fromString)

        // Get the requested job categories from the database
        val reactiveResponse = jobCategoryService.findMultiple(jobCategoryIds)
            .map { jobCategory ->
                JobCategoryToProto().convert(jobCategory)
            }
            .reduce(GetMultipleJobCategoriesResponse.newBuilder()) { builder, jobCategory ->
                builder.addCategories(jobCategory)
                builder
            }
            .map { builder ->
                builder.build()
            }

        // Block until the response is ready
        val response = reactiveResponse.block()
            ?: return RequestResponseFactory.newSuccessfulResponse()
                .setGetMultipleJobCategoriesResponse(GetMultipleJobCategoriesResponse.getDefaultInstance())
                .build()

        return RequestResponseFactory.newSuccessfulResponse()
            .setGetMultipleJobCategoriesResponse(response)
            .build()
    }
}
