package com.linkedout.jobs.service

import com.linkedout.jobs.model.JobCategory
import com.linkedout.jobs.repository.JobCategoryRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.*

@Service
class JobCategoryService(
    @Autowired private val jobCategory: JobCategoryRepository
) {
    fun findAll(): Flux<JobCategory> {
        return jobCategory.findAll()
    }

    fun findMultiple(ids: Iterable<UUID>): Flux<JobCategory> {
        return jobCategory.findAllById(ids)
    }

    fun findOneById(id: UUID): Mono<JobCategory> {
        return jobCategory.findById(id)
    }
}
