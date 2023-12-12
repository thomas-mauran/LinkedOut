package com.linkedout.backend.controller

import com.linkedout.backend.model.Job
import com.linkedout.backend.model.JobOffer
import com.linkedout.backend.service.JobOfferService
import org.springframework.http.server.reactive.ServerHttpRequest
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@RestController
@RequestMapping("/api/v1/jobOffers")
class JobOffersController(private val jobOffersService: JobOfferService) {
    @GetMapping
    open fun getJobOffers(request: ServerHttpRequest): Flux<JobOffer> {
        return Flux.fromIterable(jobOffersService.findAll(request.id))
    }

    @GetMapping("/{id}")
    open fun getJobOffer(
        @PathVariable id: String,
        request: ServerHttpRequest
    ): Mono<JobOffer> {
        return Mono.just(jobOffersService.findOne(request.id, id))
    }
}
