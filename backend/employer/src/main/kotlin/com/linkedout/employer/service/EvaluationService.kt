package com.linkedout.employer.service

import com.linkedout.employer.dto.evaluation.CreateEvaluationDto
import com.linkedout.employer.model.Evaluation
import com.linkedout.employer.repository.EvaluationRepository
import org.springframework.stereotype.Service
import reactor.core.publisher.Mono
import java.util.*

@Service
class EvaluationService(
    private val evaluationRepository: EvaluationRepository
) {
    fun findByUserIdAndEmployerId(userId: UUID, evaluationId: UUID): Mono<Evaluation> {
        return evaluationRepository.findByUserIdAndEmployerId(userId, evaluationId)
    }

    fun saveOneOfUserAndEmployer(userId: UUID, employerId: UUID, evaluation: CreateEvaluationDto): Mono<Evaluation> {
        return evaluationRepository.saveOneOfUserAndEmployer(
            userId,
            employerId,
            evaluation.score,
            evaluation.comment
        )
    }

    fun deleteByUserIdAndEmployerId(userId: UUID, employerId: UUID): Mono<Void> {
        return evaluationRepository.deleteByUserIdAndEmployerId(userId, employerId)
    }
}
