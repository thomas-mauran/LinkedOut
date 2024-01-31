package com.linkedout.jobs.service

import com.linkedout.jobs.dto.JobOfferWithJobAndCompanyAndApplicationStatus
import com.linkedout.jobs.dto.JobWithCategory
import com.linkedout.jobs.repository.JobOfferRepository
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.UUID

@Service
class JobOfferService(
    private val jobOffer: JobOfferRepository
) {
    fun findAllForUser(userId: UUID): Flux<JobOfferWithJobAndCompanyAndApplicationStatus> {
        return jobOffer.findAllForUserWithJobAndCompany(userId)
    }

    fun findOneForUser(userId: UUID, jobOfferId: UUID): Mono<JobOfferWithJobAndCompanyAndApplicationStatus> {
        return jobOffer.findOneForUserWithJobAndCompany(userId, jobOfferId)
    }

    fun findMultipleWithJobAndCompanyAndApplicationStatus(ids: Iterable<UUID>): Flux<JobOfferWithJobAndCompanyAndApplicationStatus> {
        return jobOffer.findMultipleWithJobAndCompanyAndApplicationStatus(ids)
    }

}
