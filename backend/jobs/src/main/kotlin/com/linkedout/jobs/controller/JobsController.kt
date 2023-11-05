package com.linkedout.jobs.controller
import com.linkedout.jobs.model.Job
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import com.linkedout.jobs.service.JobService
import reactor.core.publisher.Flux

@RestController
@RequestMapping("/jobs")
class JobsController(private val jobService: JobService) {
    @GetMapping
    fun getJobs(): Flux<Job>{
        return jobService.findAll()
    }
}