package com.linkedout.jobs.repository
import com.linkedout.jobs.model.JobApplication
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import java.util.UUID

interface JobApplicationRepository : ReactiveCrudRepository<JobApplication, UUID>