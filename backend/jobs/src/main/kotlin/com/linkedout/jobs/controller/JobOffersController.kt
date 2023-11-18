package com.linkedout.jobs.controller
import com.linkedout.jobs.model.JobApplication
import com.linkedout.jobs.model.JobOffer
import com.linkedout.jobs.service.JobApplicationService
import com.linkedout.jobs.service.JobOfferService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.UUID

@RestController
@RequestMapping("/jobOffers")
class JobOffersController(private val jobOfferService: JobOfferService, private val jobApplicationService: JobApplicationService) {
    @GetMapping
    fun getJobs(): Flux<JobOffer>{
        return jobOfferService.findAll()
    }
    @GetMapping("/{id}")
    fun getJob(@PathVariable id: UUID): Mono<JobOffer> {
        return jobOfferService.findOne(id)
    }

    @PostMapping("/{id}/apply")
    fun applyToJob(@PathVariable id: UUID): Mono<JobApplication>{
        return jobApplicationService.apply(id)
    }
}