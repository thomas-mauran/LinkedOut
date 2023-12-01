package com.linkedout.backend.controller

import com.linkedout.backend.model.Job
import com.linkedout.backend.service.JobService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1/jobs")
open class JobsController(private val jobService: JobService) {
    @GetMapping
    open fun getJobs(): List<Job> {
        return jobService.findAll()
    }
}
