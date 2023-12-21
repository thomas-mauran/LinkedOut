package com.linkedout.jobs.repository

import com.linkedout.jobs.model.Company
import org.springframework.data.r2dbc.repository.Query
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import reactor.core.publisher.Mono
import java.util.UUID

interface CompanyRepository : ReactiveCrudRepository<Company, UUID> {
    @Query(
        """
        INSERT INTO company (name)
        VALUES (:name)
        ON CONFLICT (name) DO UPDATE
        SET name = EXCLUDED.name
        RETURNING *;
    """
    )
    fun ensureExists(name: String): Mono<Company>
}
