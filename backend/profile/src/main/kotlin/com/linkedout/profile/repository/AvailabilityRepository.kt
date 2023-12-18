package com.linkedout.profile.repository

import com.linkedout.profile.model.Availability
import org.springframework.data.r2dbc.repository.Query
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.time.LocalDate
import java.util.*

interface AvailabilityRepository : ReactiveCrudRepository<Availability, UUID> {
    @Query(
        """
        SELECT * FROM availability
        WHERE user_id = :userId
    """
    )
    fun findByUserId(userId: UUID): Flux<Availability>

    @Query(
        """
        INSERT INTO availability (user_id, start_date, end_date, address_first_line, address_zip, address_city, range, job_category_id)
        VALUES (:userId, :startDate, :endDate, :addressFirstLine, :addressZip, :addressCity, :range, :jobCategoryId)
        RETURNING *
    """
    )
    fun saveOneOfUser(
        userId: UUID,
        startDate: LocalDate,
        endDate: LocalDate,
        addressFirstLine: String,
        addressZip: String,
        addressCity: String,
        range: Int,
        jobCategoryId: UUID
    ): Mono<Availability>

    @Query(
        """
        UPDATE availability
        SET 
            start_date = COALESCE(:startDate, start_date),
            end_date = COALESCE(:endDate, end_date),
            address_first_line = COALESCE(:addressFirstLine, address_first_line),
            address_zip = COALESCE(:addressZip, address_zip),
            address_city = COALESCE(:addressCity, address_city),
            range = COALESCE(:range, range),
            job_category_id = COALESCE(:jobCategoryId, job_category_id)
        WHERE 
            user_id = :userId
            AND id = :availabilityId
        RETURNING *
    """
    )
    fun updateOneOfUser(
        userId: UUID,
        availabilityId: UUID,
        startDate: LocalDate?,
        endDate: LocalDate?,
        addressFirstLine: String?,
        addressZip: String?,
        addressCity: String?,
        range: Int?,
        jobCategoryId: UUID?
    ): Mono<Availability>

    @Query(
        """
        SELECT * FROM availability
        WHERE user_id = :userId
        AND id = :availabilityId
    """
    )
    fun findByUserIdAndAvailabilityId(userId: UUID, availabilityId: UUID): Mono<Availability>

    @Query(
        """
        DELETE FROM availability
        WHERE user_id = :userId
        AND id = :availabilityId
    """
    )
    fun deleteByUserIdAndAvailabilityId(userId: UUID, availabilityId: UUID): Mono<Void>
}
