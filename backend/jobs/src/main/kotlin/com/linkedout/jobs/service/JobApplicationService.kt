package com.linkedout.jobs.service

import com.linkedout.jobs.model.JobApplication
import com.linkedout.jobs.repository.JobApplicationRepository
import com.linkedout.jobs.repository.JobRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import reactor.core.publisher.Mono
import java.util.UUID

@Service
class JobApplicationService(@Autowired private val jobApplicationRepository: JobApplicationRepository, @Autowired private val jobRepository: JobRepository ) {
    fun apply(jobId: UUID): Mono<JobApplication>{
        val jobExistsMono: Mono<Boolean> = jobRepository.existsById(jobId)
        println(jobExistsMono)
        return jobExistsMono.flatMap { jobExists ->
            if (jobExists) {
                // TODO: retrieve userId
                val userId = "581104d5-3af7-4dc0-836b-30574d64a1e8"
                val jobApplication = JobApplication(
                    jobId = jobId,
                    userId = UUID.fromString(userId),
                    status = false
                )
                // Save the job application
                jobApplicationRepository.save(jobApplication)
            } else {
                // If the job doesn't exist, return an error
                Mono.error(ResponseStatusException(HttpStatus.NOT_FOUND, "Job not found for ID: $jobId"))
            }
        }
    }
}