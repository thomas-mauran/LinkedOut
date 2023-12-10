package com.linkedout.employer.service

import com.linkedout.employer.model.Employer
import com.linkedout.employer.repository.EmployerRepository
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.UUID

@Service
class EmployerService(private val employerRepository: EmployerRepository) {
    fun findOne(id: UUID): Mono<Employer> {
        return employerRepository.findById(id)
    }

    fun findMultiple(ids: Iterable<UUID>): Flux<Employer> {
        return employerRepository.findAllById(ids)
    }
}
