package com.linkedout.employer.repository

import com.linkedout.employer.model.Employer
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import java.util.UUID

interface EmployerRepository : ReactiveCrudRepository<Employer, UUID>
