package com.linkedout.profile.service

import com.linkedout.profile.dto.reference.CreateReferenceDto
import com.linkedout.profile.dto.reference.UpdateReferenceDto
import com.linkedout.profile.model.Reference
import com.linkedout.profile.repository.ReferenceRepository
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.*

@Service
class ReferenceService(
    private val referenceRepository: ReferenceRepository
) {
    fun findByUserId(userId: UUID): Flux<Reference> {
        return referenceRepository.findByUserId(userId)
    }

    fun saveOneOfUser(userId: UUID, reference: CreateReferenceDto): Mono<Reference> {
        return referenceRepository.saveOneOfUser(
            userId,
            reference.firstName,
            reference.lastName,
            reference.addressFirstLine,
            reference.addressZip,
            reference.addressCity,
            reference.phone,
            reference.email,
            reference.companyId
        )
    }

    fun updateOneOfUser(userId: UUID, referenceId: UUID, reference: UpdateReferenceDto): Mono<Reference> {
        return referenceRepository.updateOneOfUser(
            userId,
            referenceId,
            reference.firstName,
            reference.lastName,
            reference.addressFirstLine,
            reference.addressZip,
            reference.addressCity,
            reference.phone,
            reference.email,
            reference.companyId
        )
    }

    fun findByUserIdAndReferenceId(userId: UUID, referenceId: UUID): Mono<Reference> {
        return referenceRepository.findByUserIdAndReferenceId(userId, referenceId)
    }

    fun deleteByUserIdAndReferenceId(userId: UUID, referenceId: UUID): Mono<Void> {
        return referenceRepository.deleteByUserIdAndReferenceId(userId, referenceId)
    }
}
