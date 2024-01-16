package com.linkedout.backend.controller

import com.linkedout.backend.model.Recommendation
import com.linkedout.backend.service.RecommendationService
import org.springframework.http.server.reactive.ServerHttpRequest
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux

@RestController
@RequestMapping("/api/v1/recommendations")
open class RecommendationController(private val recommendationService: RecommendationService) {
    @GetMapping
    open fun getJobs(request: ServerHttpRequest): Flux<Recommendation> {
        println("HERE")
        return Flux.fromIterable(recommendationService.findAll(request.id))
    }
}
