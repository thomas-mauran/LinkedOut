package com.linkedout.backend.controller

import com.linkedout.backend.model.Company
import com.linkedout.backend.service.CompanyService
import org.springframework.http.server.reactive.ServerHttpRequest
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@RestController
@RequestMapping("/api/v1/companies")
open class CompaniesController(private val companyService: CompanyService) {
    @GetMapping
    open fun getJobs(request: ServerHttpRequest): Flux<Company> {
        return companyService.findAll(request.id)
    }

    @GetMapping("/{id}")
    open fun getJob(
        @PathVariable id: String,
        request: ServerHttpRequest
    ): Mono<Company> {
        return companyService.findOne(request.id, id)
    }
}
