package com.linkedout.jobs.service

import com.linkedout.jobs.dto.JobOfferWithJobAndCompany
import com.linkedout.jobs.repository.JobOfferRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.UUID

@Service
class JobOfferService(
    @Autowired private val jobOffer: JobOfferRepository
) {
    fun findAll(): Flux<JobOfferWithJobAndCompany> {
        return jobOffer.findAllWithJobAndCompany()
    }

    fun findOne(id: UUID): Mono<JobOfferWithJobAndCompany> {
        return jobOffer.findOneWithJobAndCompany(id)
    }
}
