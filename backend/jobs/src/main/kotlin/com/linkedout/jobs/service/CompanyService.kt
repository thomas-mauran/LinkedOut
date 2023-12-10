package com.linkedout.jobs.service

import com.linkedout.jobs.dto.JobWithCategory
import com.linkedout.jobs.model.Company
import com.linkedout.jobs.repository.CompanyRepository
import com.linkedout.jobs.repository.JobRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.UUID

@Service
class CompanyService(
    private val companyRepository: CompanyRepository
) {
    fun findAll(): Flux<Company> {
        return companyRepository.findAll()
    }

    fun findOne(id: UUID): Mono<Company> {
        return companyRepository.findById(id)
    }
}
