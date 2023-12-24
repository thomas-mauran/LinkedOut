package com.linkedout.backend.controller

import com.linkedout.backend.dto.availability.CreateAvailabilityDto
import com.linkedout.backend.dto.availability.UpdateAvailabilityDto
import com.linkedout.backend.model.Availability
import com.linkedout.backend.service.AvailabilityService
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
@RequestMapping("/api/v1/profile/availabilities")
class AvailabilityController(private val availabilityService: AvailabilityService) {
    @GetMapping
    open fun getAvailabilities(request: ServerHttpRequest, principal: Principal): Flux<Availability> {
        return Flux.fromIterable(availabilityService.findAllOfUser(request.id, principal.name))
    }

    @PostMapping
    open fun createAvailability(
        request: ServerHttpRequest,
        principal: Principal,
        @RequestBody body: CreateAvailabilityDto
    ): Mono<Availability> {
        return Mono.just(availabilityService.createOneOfUser(request.id, principal.name, body))
    }

    @PatchMapping("/{availabilityId}")
    open fun updateAvailability(
        request: ServerHttpRequest,
        principal: Principal,
        @PathVariable availabilityId: String,
        @RequestBody body: UpdateAvailabilityDto
    ): Mono<Availability> {
        return Mono.just(availabilityService.updateOneOfUser(request.id, principal.name, availabilityId, body))
    }

    @GetMapping("/{availabilityId}")
    open fun getAvailability(
        request: ServerHttpRequest,
        principal: Principal,
        @PathVariable availabilityId: String
    ): Mono<Availability> {
        return Mono.just(availabilityService.findOneOfUser(request.id, principal.name, availabilityId))
    }

    @DeleteMapping("/{availabilityId}")
    open fun deleteAvailability(
        request: ServerHttpRequest,
        principal: Principal,
        @PathVariable availabilityId: String
    ): Mono<Unit> {
        availabilityService.deleteOneOfUser(request.id, principal.name, availabilityId)
        return Mono.empty()
    }
}
