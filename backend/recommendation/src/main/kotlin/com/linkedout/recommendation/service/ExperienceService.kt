package com.linkedout.recommendation.service

import com.linkedout.recommendation.dto.CreateEntityDto
import com.linkedout.recommendation.entity.ExperienceEntity
import com.linkedout.recommendation.repository.ExperienceRepository
import org.springframework.stereotype.Service
import reactor.core.publisher.Mono

@Service
class ExperienceService(
    private val experienceRepository: ExperienceRepository
) {
    fun saveExperience(experience: CreateEntityDto): Mono<ExperienceEntity> {
        println(experience)
        return experienceRepository.createExperience(experience.profile, experience.job, experience.id)
    }
}
