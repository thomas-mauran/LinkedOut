package com.linkedout.backend.controller

import com.linkedout.backend.dto.reference.CreateReferenceDto
import com.linkedout.backend.dto.reference.UpdateReferenceDto
import com.linkedout.backend.model.Reference
import com.linkedout.backend.service.ReferenceService
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
@RequestMapping("/api/v1/profile/references")
class ReferenceController(private val referenceService: ReferenceService) {
    @GetMapping
    open fun getReferences(request: ServerHttpRequest, principal: Principal): Flux<Reference> {
        return Flux.fromIterable(referenceService.findAllOfUser(request.id, principal.name))
    }

    @PostMapping
    open fun createReference(
        request: ServerHttpRequest,
        principal: Principal,
        @RequestBody body: CreateReferenceDto
    ): Mono<Reference> {
        return Mono.just(referenceService.createOneOfUser(request.id, principal.name, body))
    }

    @PatchMapping("/{referenceId}")
    open fun updateReference(
        request: ServerHttpRequest,
        principal: Principal,
        @PathVariable referenceId: String,
        @RequestBody body: UpdateReferenceDto
    ): Mono<Reference> {
        return Mono.just(referenceService.updateOneOfUser(request.id, principal.name, referenceId, body))
    }

    @GetMapping("/{referenceId}")
    open fun getReference(
        request: ServerHttpRequest,
        principal: Principal,
        @PathVariable referenceId: String
    ): Mono<Reference> {
        return Mono.just(referenceService.findOneOfUser(request.id, principal.name, referenceId))
    }

    @DeleteMapping("/{referenceId}")
    open fun deleteReference(
        request: ServerHttpRequest,
        principal: Principal,
        @PathVariable referenceId: String
    ): Mono<Unit> {
        referenceService.deleteOneOfUser(request.id, principal.name, referenceId)
        return Mono.empty()
    }
}
