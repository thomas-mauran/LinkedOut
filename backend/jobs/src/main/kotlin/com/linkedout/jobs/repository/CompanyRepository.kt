package com.linkedout.jobs.repository

import com.linkedout.jobs.dto.JobWithCategory
import com.linkedout.jobs.model.Company
import com.linkedout.jobs.model.Job
import com.linkedout.jobs.model.JobOffer
import org.springframework.data.r2dbc.repository.Query
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.UUID

interface CompanyRepository : ReactiveCrudRepository<Company, UUID>

