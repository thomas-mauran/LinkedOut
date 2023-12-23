package com.linkedout.jobs.repository

import com.linkedout.jobs.dto.JobWithCategory
import com.linkedout.jobs.model.Job
import org.springframework.data.r2dbc.repository.Query
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.UUID

interface JobRepository : ReactiveCrudRepository<Job, UUID> {
    @Query(
        """
        SELECT j.id id, j.title title, jc.title category 
        FROM job j
        JOIN jobcategory jc ON j.category = jc.id
        """
    )
    fun findAllWithCategory(): Flux<JobWithCategory>

    @Query(
        """
        SELECT j.id id, j.title title, jc.title category 
        FROM job j
        JOIN jobcategory jc ON j.category = jc.id
        WHERE j.id IN (:ids)
        """
    )
    fun findMultipleWithCategory(ids: Iterable<UUID>): Flux<JobWithCategory>

    @Query(
        """
        SELECT j.id id, j.title title, jc.title category 
        FROM job j
        JOIN jobcategory jc ON j.category = jc.id
        WHERE j.id = :id
        """
    )
    fun findOneWithCategory(id: UUID): Mono<JobWithCategory>
}
