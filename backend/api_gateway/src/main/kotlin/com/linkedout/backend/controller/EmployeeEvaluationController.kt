package com.linkedout.backend.controller

import com.linkedout.backend.model.EmployeeEvaluation
import com.linkedout.backend.service.EmployeeEvaluationService
import org.springframework.http.server.reactive.ServerHttpRequest
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.security.Principal

@RestController
@RequestMapping("/api/v1/profile/evaluations")
class EmployeeEvaluationController(private val employeeEvaluationService: EmployeeEvaluationService) {
    @GetMapping
    open fun getEvaluations(request: ServerHttpRequest, principal: Principal): Flux<EmployeeEvaluation> {
        return Flux.fromIterable(employeeEvaluationService.findAllOfUser(request.id, principal.name))
    }

    @GetMapping("/{evaluationId}")
    open fun getEvaluation(
        request: ServerHttpRequest,
        principal: Principal,
        @PathVariable evaluationId: String
    ): Mono<EmployeeEvaluation> {
        return Mono.just(employeeEvaluationService.findOneOfUser(request.id, principal.name, evaluationId))
    }
}
