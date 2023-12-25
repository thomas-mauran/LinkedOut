package com.linkedout.jobs.repository

import com.linkedout.jobs.model.JobApplication
import org.springframework.data.r2dbc.repository.Query
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import reactor.core.publisher.Mono
import java.util.UUID

interface JobApplicationRepository : ReactiveCrudRepository<JobApplication, UUID> {
    @Query(
        """
        INSERT INTO jobapplication (userid, offerid)
        VALUES (:userId, :offerId)
    """
    )
    fun saveOneWithUserIdAndOfferId(userId: UUID, offerId: UUID): Mono<Void>
}
