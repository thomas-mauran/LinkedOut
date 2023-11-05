package com.linkedout.jobs.service

import com.linkedout.jobs.model.Job
import com.linkedout.jobs.repository.JobRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux

@Service
class JobService(@Autowired private val jobRepository: JobRepository) {
    fun findAll(): Flux<Job>{
        return jobRepository.findAll()
    }
}