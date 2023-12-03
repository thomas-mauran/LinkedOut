package com.linkedout.backend.controller

import com.linkedout.backend.model.Job
import com.linkedout.backend.service.JobService
import org.springframework.http.server.reactive.ServerHttpRequest
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@RestController
@RequestMapping("/api/v1/jobs")
open class JobsController(private val jobService: JobService) {
    @GetMapping
    open fun getJobs(request: ServerHttpRequest): Flux<Job> {
        return jobService.findAll(request.id)
    }

    @GetMapping("/{id}")
    open fun getJob(
        @PathVariable id: String,
        request: ServerHttpRequest
    ): Mono<Job> {
        return jobService.findOne(request.id, id)
    }
}
