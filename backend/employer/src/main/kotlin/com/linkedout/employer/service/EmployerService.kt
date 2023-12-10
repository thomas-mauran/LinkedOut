package com.linkedout.employer.service

import com.linkedout.employer.model.Employer
import com.linkedout.employer.repository.EmployerRepository
import org.springframework.stereotype.Service
import reactor.core.publisher.Mono
import java.util.UUID

@Service
class EmployerService(private val employerRepository: EmployerRepository) {
    fun findOne(id: UUID): Mono<Employer> {
        return employerRepository.findById(id)
    }
}
