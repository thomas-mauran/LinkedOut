package com.linkedout.profile.service

import com.linkedout.profile.dto.availability.CreateAvailabilityDto
import com.linkedout.profile.dto.availability.UpdateAvailabilityDto
import com.linkedout.profile.model.Availability
import com.linkedout.profile.repository.AvailabilityRepository
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.*

@Service
class AvailabilityService(
    private val availabilityRepository: AvailabilityRepository
) {
    fun findByUserId(userId: UUID): Flux<Availability> {
        return availabilityRepository.findByUserId(userId)
    }

    fun saveOneOfUser(userId: UUID, availability: CreateAvailabilityDto): Mono<Availability> {
        return availabilityRepository.saveOneOfUser(
            userId,
            availability.startDate,
            availability.endDate,
            availability.addressFirstLine,
            availability.addressZip,
            availability.addressCity,
            availability.range,
            availability.jobCategoryId
        )
    }

    fun updateOneOfUser(userId: UUID, availabilityId: UUID, availability: UpdateAvailabilityDto): Mono<Availability> {
        return availabilityRepository.updateOneOfUser(
            userId,
            availabilityId,
            availability.startDate,
            availability.endDate,
            availability.addressFirstLine,
            availability.addressZip,
            availability.addressCity,
            availability.range,
            availability.jobCategoryId
        )
    }

    fun findByUserIdAndAvailabilityId(userId: UUID, availabilityId: UUID): Mono<Availability> {
        return availabilityRepository.findByUserIdAndAvailabilityId(userId, availabilityId)
    }

    fun deleteByUserIdAndAvailabilityId(userId: UUID, availabilityId: UUID): Mono<Void> {
        return availabilityRepository.deleteByUserIdAndAvailabilityId(userId, availabilityId)
    }
}
