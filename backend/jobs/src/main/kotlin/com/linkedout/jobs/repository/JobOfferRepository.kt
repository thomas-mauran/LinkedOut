package com.linkedout.jobs.repository
import com.linkedout.jobs.dto.JobOfferWithJobAndCompany
import com.linkedout.jobs.model.JobOffer
import org.springframework.data.r2dbc.repository.Query
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.UUID

interface JobOfferRepository : ReactiveCrudRepository<JobOffer, UUID> {
    @Query(
        """
            SELECT jo.id as jobOfferId, jo.job as jobId, jo.title as jobOfferTitle, jo.description as jobOfferDescription, jo.geographicArea as jobOfferGeographicArea, jo.startdate as jobOfferStartDate, jo.enddate as jobOfferEndDate, jo.company as companyId, c.name as companyName, jo.salary as jobOfferSalary, jc.title as jobCategoryTitle, j.title as jobTitle, jo.status as status
            FROM jobOffer jo
            JOIN company c ON jo.company = c.id
            JOIN job j ON jo.job = j.id
            JOIN jobcategory jc ON j.category = jc.id
        """
    )
    fun findAllWithJobAndCompany(): Flux<JobOfferWithJobAndCompany>

    @Query(
        """
        SELECT jo.id as jobOfferId, jo.job as jobId, jo.title as jobOfferTitle, jo.description as jobOfferDescription, jo.geographicArea as jobOfferGeographicArea, jo.startdate as jobOfferStartDate, jo.enddate as jobOfferEndDate, jo.company as companyId, c.name as companyName, jo.salary as jobOfferSalary, jc.title as jobCategoryTitle, j.title as jobTitle, jo.status as status
        FROM jobOffer jo
        JOIN company c ON jo.company = c.id
        JOIN job j ON jo.job = j.id
        JOIN jobcategory jc ON j.category = jc.id
        WHERE jo.id = :id
        """
    )
    fun findOneWithJobAndCompany(id: UUID): Mono<JobOfferWithJobAndCompany>
}
