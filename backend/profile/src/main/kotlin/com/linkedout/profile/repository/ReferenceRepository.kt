package com.linkedout.profile.repository

import com.linkedout.profile.model.Reference
import org.springframework.data.r2dbc.repository.Query
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.*

interface ReferenceRepository : ReactiveCrudRepository<Reference, UUID> {
    @Query(
        """
        SELECT * FROM reference
        WHERE user_id = :userId
    """
    )
    fun findByUserId(userId: UUID): Flux<Reference>

    @Query(
        """
        INSERT INTO reference (user_id, first_name, last_name, address_first_line, address_zip, address_city, phone, email, company_id)
        VALUES (:userId, :firstName, :lastName, :addressFirstLine, :addressZip, :addressCity, :phone, :email, :companyId)
        RETURNING *
    """
    )
    fun saveOneOfUser(
        userId: UUID,
        firstName: String,
        lastName: String,
        addressFirstLine: String,
        addressZip: String,
        addressCity: String,
        phone: String,
        email: String,
        companyId: UUID
    ): Mono<Reference>

    @Query(
        """
        UPDATE reference 
        SET 
            first_name = COALESCE(:firstName, first_name),
            last_name = COALESCE(:lastName, last_name),
            address_first_line = COALESCE(:addressFirstLine, address_first_line),
            address_zip = COALESCE(:addressZip, address_zip),
            address_city = COALESCE(:addressCity, address_city),
            phone = COALESCE(:phone, phone),
            email = COALESCE(:email, email),
            company_id = COALESCE(:companyId, company_id)
        WHERE 
            user_id = :userId
            AND id = :referenceId
        RETURNING *
    """
    )
    fun updateOneOfUser(
        userId: UUID,
        referenceId: UUID,
        firstName: String?,
        lastName: String?,
        addressFirstLine: String?,
        addressZip: String?,
        addressCity: String?,
        phone: String?,
        email: String?,
        companyId: UUID?
    ): Mono<Reference>

    @Query(
        """
        SELECT * FROM reference
        WHERE user_id = :userId
        AND id = :referenceId
    """
    )
    fun findByUserIdAndReferenceId(userId: UUID, referenceId: UUID): Mono<Reference>

    @Query(
        """
        DELETE FROM reference
        WHERE user_id = :userId
        AND id = :referenceId
    """
    )
    fun deleteByUserIdAndReferenceId(userId: UUID, referenceId: UUID): Mono<Void>
}
