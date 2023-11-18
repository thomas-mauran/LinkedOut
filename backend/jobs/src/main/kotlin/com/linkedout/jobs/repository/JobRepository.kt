package com.linkedout.jobs.repository
import com.linkedout.jobs.model.Job
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import java.util.UUID

interface JobRepository : ReactiveCrudRepository<Job, UUID>
