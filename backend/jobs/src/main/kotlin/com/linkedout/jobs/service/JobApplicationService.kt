package com.linkedout.jobs.service

import com.linkedout.jobs.repository.JobApplicationRepository
import org.springframework.stereotype.Service
import reactor.core.publisher.Mono
import java.util.UUID

@Service
class JobApplicationService(
    private val jobApplicationRepository: JobApplicationRepository
) {
    fun applyTo(userId: UUID, jobOfferId: UUID): Mono<Void> {
        return jobApplicationRepository.saveOneWithUserIdAndOfferId(userId, jobOfferId)
    }
}
