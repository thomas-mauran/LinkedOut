package com.linkedout.jobs.service

import com.linkedout.jobs.dto.JobWithCategory
import com.linkedout.jobs.repository.JobRepository
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.UUID

@Service
class JobService(
    private val jobRepository: JobRepository
) {
    fun findAllWithCategory(): Flux<JobWithCategory> {
        return jobRepository.findAllWithCategory()
    }

    fun findMultipleWithCategory(ids: Iterable<UUID>): Flux<JobWithCategory> {
        return jobRepository.findMultipleWithCategory(ids)
    }

    fun findOneWithCategory(id: UUID): Mono<JobWithCategory> {
        return jobRepository.findOneWithCategory(id)
    }
}
