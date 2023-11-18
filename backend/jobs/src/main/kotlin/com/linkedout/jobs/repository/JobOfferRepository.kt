package com.linkedout.jobs.repository
import com.linkedout.jobs.model.JobOffer
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import java.util.UUID

interface JobOfferRepository : ReactiveCrudRepository<JobOffer, UUID>
