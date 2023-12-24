package com.linkedout.backend.controller

import com.linkedout.backend.dto.profile.ProfileWithStatsDto
import com.linkedout.backend.dto.profile.SetProfileDto
import com.linkedout.backend.dto.profile.UpdateProfileDto
import com.linkedout.backend.model.Profile
import com.linkedout.backend.service.ProfileService
import org.springframework.http.server.reactive.ServerHttpRequest
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.security.Principal

@RestController
@RequestMapping("/api/v1/profile")
class ProfileController(
    private val profileService: ProfileService
) {
    @GetMapping
    open fun getProfile(request: ServerHttpRequest, principal: Principal): Mono<ProfileWithStatsDto> {
        return Mono.just(profileService.findOne(request.id, principal.name))
    }

    @PutMapping
    open fun setProfile(
        request: ServerHttpRequest,
        principal: Principal,
        @RequestBody body: SetProfileDto
    ): Mono<Profile> {
        return Mono.just(profileService.setOne(request.id, principal.name, body))
    }

    @PatchMapping
    open fun updateProfile(
        request: ServerHttpRequest,
        principal: Principal,
        @RequestBody body: UpdateProfileDto
    ): Mono<Profile> {
        return Mono.just(profileService.updateOne(request.id, principal.name, body))
    }

    @PostMapping("/requestDeletion")
    open fun requestDeletion(request: ServerHttpRequest, principal: Principal): Mono<Unit> {
        profileService.requestDeletion(request.id, principal.name)
        return Mono.empty()
    }

    @GetMapping("/requestDeletion")
    @PreAuthorize("hasRole('client_admin')")
    open fun getProfilesRequestingDeletion(request: ServerHttpRequest): Flux<Profile> {
        return Flux.fromIterable(profileService.getProfilesRequestingDeletion(request.id))
    }

    @DeleteMapping("/{profileId}")
    @PreAuthorize("hasRole('client_admin')")
    open fun deleteProfile(
        request: ServerHttpRequest,
        @PathVariable profileId: String
    ): Mono<Unit> {
        profileService.deleteOne(request.id, profileId)
        return Mono.empty()
    }
}
