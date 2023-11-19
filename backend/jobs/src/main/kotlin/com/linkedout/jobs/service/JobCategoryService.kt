package com.linkedout.jobs.service

import com.linkedout.jobs.model.JobCategory
import com.linkedout.jobs.repository.JobCategoryRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux

@Service
class JobCategoryService(
    @Autowired private val jobCategory: JobCategoryRepository
) {
    fun findAll(): Flux<JobCategory> {
        return jobCategory.findAll()
    }
}
