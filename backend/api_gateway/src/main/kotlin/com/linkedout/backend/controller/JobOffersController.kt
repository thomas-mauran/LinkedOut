package com.linkedout.backend.controller

import com.linkedout.backend.model.JobOffer
import com.linkedout.backend.service.JobOfferService
import org.springframework.http.server.reactive.ServerHttpRequest
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.security.Principal

@RestController
@RequestMapping("/api/v1/jobOffers")
class JobOffersController(private val jobOffersService: JobOfferService) {

    @GetMapping
    open fun getJobOffers(
        request: ServerHttpRequest,
        principal: Principal,
        @RequestParam(required = false, defaultValue = "false") onlyApplied: Boolean
    ): Flux<JobOffer> {
        if (onlyApplied) {
            return Flux.fromIterable(jobOffersService.findAllApplied(request.id, principal.name))
        }
        return Flux.fromIterable(jobOffersService.findAll(request.id, principal.name))
    }

    @GetMapping("/{jobOfferId}")
    open fun getJobOffer(
        request: ServerHttpRequest,
        principal: Principal,
        @PathVariable jobOfferId: String
    ): Mono<JobOffer> {
        return Mono.just(jobOffersService.findOne(request.id, principal.name, jobOfferId))
    }

    @PostMapping("/{jobOfferId}/apply")
    open fun applyToJobOffer(
        request: ServerHttpRequest,
        principal: Principal,
        @PathVariable jobOfferId: String
    ): Mono<Unit> {
        jobOffersService.applyToJobOffer(request.id, principal.name, jobOfferId)
        return Mono.empty()
    }
}
