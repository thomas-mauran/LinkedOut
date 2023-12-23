package com.linkedout.profile.service

import com.linkedout.profile.model.Evaluation
import com.linkedout.profile.repository.EvaluationRepository
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.*

@Service
class EvaluationService(
    private val evaluationRepository: EvaluationRepository
) {
    fun findByUserId(userId: UUID): Flux<Evaluation> {
        return evaluationRepository.findByUserId(userId)
    }

    fun findByUserIdAndEvaluationId(userId: UUID, evaluationId: UUID): Mono<Evaluation> {
        return evaluationRepository.findByUserIdAndEvaluationId(userId, evaluationId)
    }
}
