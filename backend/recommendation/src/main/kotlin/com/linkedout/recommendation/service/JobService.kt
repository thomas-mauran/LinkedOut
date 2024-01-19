package com.linkedout.recommendation.service

import com.linkedout.recommendation.dto.CreateJobDto
import com.linkedout.recommendation.entity.JobEntity
import com.linkedout.recommendation.repository.JobRepository
import org.springframework.stereotype.Service
import reactor.core.publisher.Mono

@Service
class JobService(
    private val jobRepository: JobRepository
) {
    fun saveJob(job: JobEntity): Mono<JobEntity> {
        return jobRepository.save(job);
    }
}
