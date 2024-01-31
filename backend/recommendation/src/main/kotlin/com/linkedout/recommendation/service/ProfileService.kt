package com.linkedout.recommendation.service

import com.linkedout.recommendation.entity.ProfileEntity
import com.linkedout.recommendation.repository.ProfileRepository
import org.springframework.stereotype.Service
import reactor.core.publisher.Mono

@Service
class ProfileService(
    private val profileRepository: ProfileRepository
) {
    fun saveProfile(profile: ProfileEntity): Mono<ProfileEntity> {
        return profileRepository.save(profile);
    }
}
