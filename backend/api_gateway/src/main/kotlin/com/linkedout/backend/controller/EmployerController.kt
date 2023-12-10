package com.linkedout.backend.controller

import com.linkedout.backend.model.Employer
import com.linkedout.backend.service.EmployerService
import org.springframework.http.server.reactive.ServerHttpRequest
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Mono

@RestController
@RequestMapping("/api/v1/employers")
class EmployerController(
    private val employerService: EmployerService
) {
    @GetMapping("/{employerId}")
    open fun getEmployerById(request: ServerHttpRequest, @PathVariable employerId: String): Mono<Employer> {
        return Mono.just(employerService.findOne(request.id, employerId))
    }
}
