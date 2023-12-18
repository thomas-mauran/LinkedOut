package com.linkedout.jobs.converter.jobOffers

import com.linkedout.jobs.dto.JobOfferWithJobAndCompany
import com.linkedout.proto.models.CompanyOuterClass
import com.linkedout.proto.models.JobOfferOuterClass
import com.linkedout.proto.models.JobOuterClass
import org.springframework.core.convert.converter.Converter

class JobOfferWithJobAndCompanyToProto : Converter<JobOfferWithJobAndCompany, JobOfferOuterClass.JobOffer> {
    override fun convert(source: JobOfferWithJobAndCompany): JobOfferOuterClass.JobOffer {
        return JobOfferOuterClass.JobOffer.newBuilder()
            .setId(source.jobOfferId)
            .setTitle(source.title)
            .setDescription(source.description)
            .setStartDate(source.startDate.toString())
            .setEndDate(source.endDate.toString())
            .setGeographicArea(source.geographicArea)
            .setSalary(source.salary)
            .setCompany(
                CompanyOuterClass.Company.newBuilder()
                    .setId(source.companyId)
                    .setName(source.companyName)
            )
            .setJob(
                JobOuterClass.Job.newBuilder()
                    .setId(source.jobId)
                    .setTitle(source.jobTitle)
                    .setCategory(source.jobCategoryTitle)
            )
            .setStatus(source.jobOfferStatus)
            .build()
    }
}
