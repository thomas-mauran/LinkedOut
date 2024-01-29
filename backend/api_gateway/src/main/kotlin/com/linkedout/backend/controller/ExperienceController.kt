package com.linkedout.backend.controller

import com.linkedout.backend.dto.experience.CreateExperienceDto
import com.linkedout.backend.dto.experience.UpdateExperienceDto
import com.linkedout.backend.model.Experience
import com.linkedout.backend.service.ExperienceService
import org.springframework.http.server.reactive.ServerHttpRequest
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.security.Principal

@RestController
@RequestMapping("/api/v1/profile/experiences")
class ExperienceController(private val experienceService: ExperienceService) {
    @GetMapping
    open fun getExperiences(request: ServerHttpRequest, principal: Principal): Flux<Experience> {
        return Flux.fromIterable(experienceService.findAllOfUser(request.id, principal.name))
    }

    @PostMapping
    open fun createExperience(
        request: ServerHttpRequest,
        principal: Principal,
        @RequestBody body: CreateExperienceDto
    ): Mono<Experience> {
        println("here")
        println(principal.name)
        return Mono.just(experienceService.createOneOfUser(request.id, principal.name, body))
    }

    @PatchMapping("/{experienceId}")
    open fun updateExperience(
        request: ServerHttpRequest,
        principal: Principal,
        @PathVariable experienceId: String,
        @RequestBody body: UpdateExperienceDto
    ): Mono<Experience> {
        return Mono.just(experienceService.updateOneOfUser(request.id, principal.name, experienceId, body))
    }

    @GetMapping("/{experienceId}")
    open fun getExperience(
        request: ServerHttpRequest,
        principal: Principal,
        @PathVariable experienceId: String
    ): Mono<Experience> {
        return Mono.just(experienceService.findOneOfUser(request.id, principal.name, experienceId))
    }

    @DeleteMapping("/{experienceId}")
    open fun deleteExperience(
        request: ServerHttpRequest,
        principal: Principal,
        @PathVariable experienceId: String
    ): Mono<Unit> {
        experienceService.deleteOneOfUser(request.id, principal.name, experienceId)
        return Mono.empty()
    }
}
