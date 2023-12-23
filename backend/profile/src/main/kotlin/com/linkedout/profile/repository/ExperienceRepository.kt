package com.linkedout.profile.repository

import com.linkedout.profile.model.Experience
import org.springframework.data.r2dbc.repository.Query
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.time.LocalDate
import java.util.*

interface ExperienceRepository : ReactiveCrudRepository<Experience, UUID> {
    @Query(
        """
        SELECT * FROM experience
        WHERE user_id = :userId
    """
    )
    fun findByUserId(userId: UUID): Flux<Experience>

    @Query(
        """
        INSERT INTO experience (user_id, start_date, end_date, company_address_first_line, company_address_zip, company_address_city, company_id, job_id)
        VALUES (:userId, :startDate, :endDate, :companyAddressFirstLine, :companyAddressZip, :companyAddressCity, :companyId, :jobId)
        RETURNING *
    """
    )
    fun saveOneOfUser(
        userId: UUID,
        startDate: LocalDate,
        endDate: LocalDate,
        companyAddressFirstLine: String,
        companyAddressZip: String,
        companyAddressCity: String,
        companyId: UUID,
        jobId: UUID
    ): Mono<Experience>

    @Query(
        """
        UPDATE experience
        SET 
            start_date = COALESCE(:startDate, start_date),
            end_date = COALESCE(:endDate, end_date),
            company_address_first_line = COALESCE(:companyAddressFirstLine, company_address_first_line),
            company_address_zip = COALESCE(:companyAddressZip, company_address_zip),
            company_address_city = COALESCE(:companyAddressCity, company_address_city),
            company_id = COALESCE(:companyId, company_id),
            job_id = COALESCE(:jobId, job_id)
        WHERE 
            user_id = :userId
            AND id = :experienceId
        RETURNING *
    """
    )
    fun updateOneOfUser(
        userId: UUID,
        experienceId: UUID,
        startDate: LocalDate?,
        endDate: LocalDate?,
        companyAddressFirstLine: String?,
        companyAddressZip: String?,
        companyAddressCity: String?,
        companyId: UUID?,
        jobId: UUID?
    ): Mono<Experience>

    @Query(
        """
        SELECT * FROM experience
        WHERE user_id = :userId
        AND id = :experienceId
    """
    )
    fun findByUserIdAndExperienceId(userId: UUID, experienceId: UUID): Mono<Experience>

    @Query(
        """
        DELETE FROM experience
        WHERE user_id = :userId
        AND id = :experienceId
    """
    )
    fun deleteByUserIdAndExperienceId(userId: UUID, experienceId: UUID): Mono<Void>
}
