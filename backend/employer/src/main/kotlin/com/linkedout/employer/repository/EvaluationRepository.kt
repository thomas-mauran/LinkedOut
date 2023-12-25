package com.linkedout.employer.repository

import com.linkedout.employer.model.Evaluation
import org.springframework.data.r2dbc.repository.Query
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import reactor.core.publisher.Mono
import java.util.*

interface EvaluationRepository : ReactiveCrudRepository<Evaluation, UUID> {
    @Query(
        """
        SELECT * FROM evaluation
        WHERE user_id = :userId
        AND employer_id = :employerId
    """
    )
    fun findByUserIdAndEmployerId(userId: UUID, employerId: UUID): Mono<Evaluation>

    @Query(
        """
        INSERT INTO evaluation (user_id, employer_id, score, comment)
        VALUES (:userId, :employerId, :score, :comment)
        ON CONFLICT (user_id, employer_id) DO UPDATE SET
            score = :score,
            comment = :comment
        RETURNING *
    """
    )
    fun saveOneOfUserAndEmployer(
        userId: UUID,
        employerId: UUID,
        score: Int,
        comment: String
    ): Mono<Evaluation>

    @Query(
        """
        DELETE FROM evaluation
        WHERE user_id = :userId
        AND employer_id = :employerId
    """
    )
    fun deleteByUserIdAndEmployerId(userId: UUID, employerId: UUID): Mono<Void>
}
