package com.linkedout.jobs.repository
import com.linkedout.jobs.model.JobCategory
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import java.util.UUID

interface JobCategoryRepository : ReactiveCrudRepository<JobCategory, UUID>