package com.linkedout.backend.controller

import com.linkedout.backend.model.JobCategory
import com.linkedout.backend.service.JobCategoryService
import org.springframework.http.server.reactive.ServerHttpRequest
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux

@RestController
@RequestMapping("/api/v1/jobs/categories")
class JobCategoriesController(private val jobCategoryService: JobCategoryService) {
    @GetMapping
    open fun getJobCategories(request: ServerHttpRequest): Flux<JobCategory> {
        return jobCategoryService.findAll(request.id)
    }
}
