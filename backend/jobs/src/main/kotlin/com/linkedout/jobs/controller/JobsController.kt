package com.linkedout.jobs.controller
import com.linkedout.jobs.model.Job
import com.linkedout.jobs.model.JobCategory
import com.linkedout.jobs.service.JobCategoryService
import com.linkedout.jobs.service.JobService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.UUID

@RestController
@RequestMapping("/jobs")
class JobsController(private val jobService: JobService, private val jobCategoryService: JobCategoryService) {
    @GetMapping("/{id}")
    fun getJob(
        @PathVariable id: UUID
    ): Mono<Job> {
        return jobService.findOne(id)
    }

    @GetMapping("/categories")
    fun getCategories(): Flux<JobCategory> {
        return jobCategoryService.findAll()
    }
}
