package com.linkedout.jobs.repository

import com.linkedout.jobs.model.Company
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import java.util.UUID

interface CompanyRepository : ReactiveCrudRepository<Company, UUID>
