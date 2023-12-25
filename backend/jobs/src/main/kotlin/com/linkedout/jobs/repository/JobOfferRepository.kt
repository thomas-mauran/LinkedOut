package com.linkedout.jobs.repository
import com.linkedout.jobs.dto.JobOfferWithJobAndCompanyAndApplicationStatus
import com.linkedout.jobs.model.JobOffer
import org.springframework.data.r2dbc.repository.Query
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.UUID

interface JobOfferRepository : ReactiveCrudRepository<JobOffer, UUID> {
    @Query(
        """
        SELECT jo.id                   as jobOfferId,
               jo.job                  as jobId,
               jo.title                as jobOfferTitle,
               jo.description          as jobOfferDescription,
               jo.geographicArea       as jobOfferGeographicArea,
               jo.startdate            as jobOfferStartDate,
               jo.enddate              as jobOfferEndDate,
               jo.company              as companyId,
               c.name                  as companyName,
               jo.salary               as jobOfferSalary,
               jc.title                as jobCategoryTitle,
               j.title                 as jobTitle,
               COALESCE(ja.status, -1) as jobApplicationStatus
        FROM jobOffer jo
                 JOIN company c ON jo.company = c.id
                 JOIN job j ON jo.job = j.id
                 JOIN jobcategory jc ON j.category = jc.id
                 LEFT JOIN jobapplication ja ON jo.id = ja.offerid AND ja.userid = :userId
        """
    )
    fun findAllForUserWithJobAndCompany(userId: UUID): Flux<JobOfferWithJobAndCompanyAndApplicationStatus>

    @Query(
        """
        SELECT jo.id                   as jobOfferId,
               jo.job                  as jobId,
               jo.title                as jobOfferTitle,
               jo.description          as jobOfferDescription,
               jo.geographicArea       as jobOfferGeographicArea,
               jo.startdate            as jobOfferStartDate,
               jo.enddate              as jobOfferEndDate,
               jo.company              as companyId,
               c.name                  as companyName,
               jo.salary               as jobOfferSalary,
               jc.title                as jobCategoryTitle,
               j.title                 as jobTitle,
               COALESCE(ja.status, -1) as jobApplicationStatus
        FROM jobOffer jo
                 JOIN company c ON jo.company = c.id
                 JOIN job j ON jo.job = j.id
                 JOIN jobcategory jc ON j.category = jc.id
                 LEFT JOIN jobapplication ja ON jo.id = ja.offerid AND ja.userid = :userId
        WHERE jo.id = :jobOfferId
        """
    )
    fun findOneForUserWithJobAndCompany(userId: UUID, jobOfferId: UUID): Mono<JobOfferWithJobAndCompanyAndApplicationStatus>
}
