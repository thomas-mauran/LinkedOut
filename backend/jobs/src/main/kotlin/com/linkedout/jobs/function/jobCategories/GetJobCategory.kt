package com.linkedout.jobs.function.jobCategories

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.jobs.service.JobCategoryService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.models.JobCategoryOuterClass
import com.linkedout.proto.services.Jobs.GetJobCategoryResponse
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
import java.util.UUID
import java.util.function.Function

@Component
class GetJobCategory(private val jobCategoryService: JobCategoryService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Extract the request
        val request = t.getJobCategoryRequest
        val categoryId = UUID.fromString(request.id)

        // Get the job category from the database
        val reactiveResponse = jobCategoryService.findOneById(categoryId)
            .map { jobCategory ->
                JobCategoryOuterClass.JobCategory.newBuilder()
                    .setId(jobCategory.id.toString())
                    .setCategory(jobCategory.title)
                    .build()
            }
            .map { jobCategory ->
                GetJobCategoryResponse.newBuilder()
                    .setCategory(jobCategory)
                    .build()
            }

        // Block until the response is ready
        val response = reactiveResponse.block()
            ?: return RequestResponseFactory.newFailedResponse("Job category not found", HttpStatus.NOT_FOUND).build()

        return RequestResponseFactory.newSuccessfulResponse()
            .setGetJobCategoryResponse(response)
            .build()
    }
}
