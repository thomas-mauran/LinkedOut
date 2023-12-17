package com.linkedout.profile.service

import com.linkedout.profile.dto.CreateProfileDto
import com.linkedout.profile.dto.UpdateProfileDto
import com.linkedout.profile.model.Profile
import com.linkedout.profile.repository.ProfileRepository
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.UUID

@Service
class ProfileService(
    private val profileRepository: ProfileRepository
) {
    fun findOneOfUser(seasonworkerId: UUID): Mono<Profile> {
        return profileRepository.findOneByUserId(seasonworkerId)
    }

    fun setOneOfUser(seasonworkerId: UUID, profile: CreateProfileDto): Mono<Profile> {
        return profileRepository.setOneByUserId(
            seasonworkerId,
            profile.firstName,
            profile.lastName,
            profile.gender,
            profile.birthday,
            profile.nationality,
            profile.addressFirstLine,
            profile.addressZip,
            profile.addressCity,
            profile.phone,
            profile.email,
            profile.shortBio
        )
    }

    fun updateOneOfUser(seasonworkerId: UUID, profile: UpdateProfileDto): Mono<Profile> {
        return profileRepository.updateOneByUserId(
            seasonworkerId,
            profile.firstName,
            profile.lastName,
            profile.gender,
            profile.birthday,
            profile.nationality,
            profile.addressFirstLine,
            profile.addressZip,
            profile.addressCity,
            profile.phone,
            profile.email,
            profile.shortBio
        )
    }

    fun requestDeletionOfUser(seasonworkerId: UUID): Mono<Void> {
        return profileRepository.markAsPendingDeletion(seasonworkerId)
    }

    fun findAllPendingDeletion(): Flux<Profile> {
        return profileRepository.findAllPendingDeletion()
    }

    fun deleteOne(profileId: UUID): Mono<Void> {
        return profileRepository.deleteById(profileId)
    }
}
