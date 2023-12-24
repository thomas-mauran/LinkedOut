package com.linkedout.profile.repository

import com.linkedout.profile.model.Evaluation
import org.springframework.data.r2dbc.repository.Query
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.*

interface EvaluationRepository : ReactiveCrudRepository<Evaluation, UUID> {
    @Query(
        """
        SELECT * FROM evaluation
        WHERE user_id = :userId
    """
    )
    fun findByUserId(userId: UUID): Flux<Evaluation>

    @Query(
        """
        SELECT * FROM evaluation
        WHERE user_id = :userId
        AND id = :evaluationId
    """
    )
    fun findByUserIdAndEvaluationId(userId: UUID, evaluationId: UUID): Mono<Evaluation>
}
