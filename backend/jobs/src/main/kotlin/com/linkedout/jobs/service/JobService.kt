package com.linkedout.jobs.service

import com.linkedout.jobs.model.Job
import com.linkedout.jobs.model.JobCategory
import com.linkedout.jobs.repository.JobCategoryRepository
import com.linkedout.jobs.repository.JobRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.UUID

@Service
class JobService(@Autowired private val jobRepository: JobRepository) {
    fun findAll(): Flux<Job>{
        return jobRepository.findAll()
    }
    fun findOne(id: UUID): Mono<Job> {
        return jobRepository.findById(id)
    }
}