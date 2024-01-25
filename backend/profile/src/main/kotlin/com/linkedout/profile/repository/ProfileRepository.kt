package com.linkedout.profile.repository

import com.linkedout.profile.model.Profile
import com.linkedout.profile.model.ProfileStats
import org.springframework.data.r2dbc.repository.Query
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.time.LocalDate
import java.util.UUID

interface ProfileRepository : ReactiveCrudRepository<Profile, UUID> {
    @Query(
        """
        SELECT * FROM profile 
        WHERE user_id = :userId
    """
    )
    fun findOneByUserId(userId: UUID): Mono<Profile>

    @Query(
        """
        INSERT INTO profile (user_id, first_name, last_name, gender, birthday, nationality, address_first_line, address_zip, address_city, phone, email, short_bio)
        VALUES
            (:userId, :firstName, :lastName, :gender, :birthday, :nationality, :addressFirstLine, :addressZip, :addressCity, :phone, :email, :shortBio)
        ON CONFLICT (user_id) DO UPDATE
        SET
            first_name = EXCLUDED.first_name,
            last_name = EXCLUDED.last_name,
            gender = EXCLUDED.gender,
            birthday = EXCLUDED.birthday,
            nationality = EXCLUDED.nationality,
            address_first_line = EXCLUDED.address_first_line,
            address_zip = EXCLUDED.address_zip,
            address_city = EXCLUDED.address_city,
            phone = EXCLUDED.phone,
            email = EXCLUDED.email,
            short_bio = EXCLUDED.short_bio
        RETURNING *;
    """
    )
    fun setOneByUserId(
        userId: UUID,
        firstName: String,
        lastName: String,
        gender: Int,
        birthday: LocalDate,
        nationality: String,
        addressFirstLine: String,
        addressZip: String,
        addressCity: String,
        phone: String,
        email: String,
        shortBio: String
    ): Mono<Profile>

    @Query(
        """
        UPDATE profile
        SET
            first_name = COALESCE(:firstName, first_name),
            last_name = COALESCE(:lastName, last_name),
            gender = COALESCE(:gender, gender),
            birthday = COALESCE(:birthday, birthday),
            nationality = COALESCE(:nationality, nationality),
            address_first_line = COALESCE(:addressFirstLine, address_first_line),
            address_zip = COALESCE(:addressZip, address_zip),
            address_city = COALESCE(:addressCity, address_city),
            phone = COALESCE(:phone, phone),
            email = COALESCE(:email, email),
            short_bio = COALESCE(:shortBio, short_bio)
        WHERE
            user_id = :userId
        RETURNING *;
    """
    )
    fun updateOneByUserId(
        userId: UUID,
        firstName: String?,
        lastName: String?,
        gender: Int?,
        birthday: LocalDate?,
        nationality: String?,
        addressFirstLine: String?,
        addressZip: String?,
        addressCity: String?,
        phone: String?,
        email: String?,
        shortBio: String?
    ): Mono<Profile>

    @Query(
        """
        UPDATE profile
        SET
            deletion_requested = true
        WHERE
            user_id = :userId;
    """
    )
    fun markAsPendingDeletion(userId: UUID): Mono<Void>

    @Query(
        """
        SELECT * FROM profile
        WHERE deletion_requested = true;
    """
    )
    fun findAllPendingDeletion(): Flux<Profile>

    @Query(
        """
        SELECT (SELECT COUNT(*)
        FROM experience
        WHERE user_id = :userId) as nb_experiences,
       (SELECT COUNT(*)
        FROM evaluation
        WHERE user_id = :userId) as nb_reviews,
       (SELECT AVG(score)
        FROM evaluation
        WHERE user_id = :userId) as avg_rating;
    """
    )
    fun getProfileStatsOfUser(userId: UUID): Mono<ProfileStats>
}
