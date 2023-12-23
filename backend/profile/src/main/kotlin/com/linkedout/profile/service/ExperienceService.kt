package com.linkedout.profile.service

import com.linkedout.profile.dto.experience.CreateExperienceDto
import com.linkedout.profile.dto.experience.UpdateExperienceDto
import com.linkedout.profile.model.Experience
import com.linkedout.profile.repository.ExperienceRepository
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.*

@Service
class ExperienceService(
    private val experienceRepository: ExperienceRepository
) {
    fun findByUserId(userId: UUID): Flux<Experience> {
        return experienceRepository.findByUserId(userId)
    }

    fun saveOneOfUser(userId: UUID, experience: CreateExperienceDto): Mono<Experience> {
        return experienceRepository.saveOneOfUser(
            userId,
            experience.startDate,
            experience.endDate,
            experience.companyAddressFirstLine,
            experience.companyAddressZip,
            experience.companyAddressCity,
            experience.companyId,
            experience.jobId
        )
    }

    fun updateOneOfUser(userId: UUID, experienceId: UUID, experience: UpdateExperienceDto): Mono<Experience> {
        return experienceRepository.updateOneOfUser(
            userId,
            experienceId,
            experience.startDate,
            experience.endDate,
            experience.companyAddressFirstLine,
            experience.companyAddressZip,
            experience.companyAddressCity,
            experience.companyId,
            experience.jobId
        )
    }

    fun findByUserIdAndExperienceId(userId: UUID, experienceId: UUID): Mono<Experience> {
        return experienceRepository.findByUserIdAndExperienceId(userId, experienceId)
    }

    fun deleteByUserIdAndExperienceId(userId: UUID, experienceId: UUID): Mono<Void> {
        return experienceRepository.deleteByUserIdAndExperienceId(userId, experienceId)
    }
}
