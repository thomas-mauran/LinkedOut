package com.linkedout.jobs.converter.jobOffers

import com.linkedout.jobs.dto.JobOfferWithJobAndCompanyAndApplicationStatus
import com.linkedout.proto.models.CompanyOuterClass
import com.linkedout.proto.models.JobOfferOuterClass
import com.linkedout.proto.models.JobOuterClass
import org.springframework.core.convert.converter.Converter

class JobOfferWithJobAndCompanyToProto : Converter<JobOfferWithJobAndCompanyAndApplicationStatus, JobOfferOuterClass.JobOffer.Builder> {
    override fun convert(source: JobOfferWithJobAndCompanyAndApplicationStatus): JobOfferOuterClass.JobOffer.Builder {
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
            .setEmployerId(source.employerId)
    }
}
