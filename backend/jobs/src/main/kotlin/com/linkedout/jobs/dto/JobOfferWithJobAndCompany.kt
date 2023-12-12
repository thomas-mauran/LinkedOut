package com.linkedout.jobs.dto

import org.springframework.data.relational.core.mapping.Column
import java.time.LocalDate

data class JobOfferWithJobAndCompany(
    @Column("jobofferid")
    val jobOfferId: String,
    @Column("jobid")
    val jobId: String,
    @Column("companyid")
    val companyId: String,
    @Column("joboffertitle")
    val title: String,
    @Column("jobofferdescription")
    val description: String,
    @Column("jobofferstartdate")
    val startDate: LocalDate,
    @Column("jobofferenddate")
    val endDate: LocalDate,
    @Column("joboffergeographicarea")
    val geographicArea: String,
    @Column("companyname")
    val companyName: String,
    @Column("joboffersalary")
    val salary: Int,
    @Column("jobcategorytitle")
    val jobCategoryTitle: String,
    @Column("jobtitle")
    val jobTitle: String,
    @Column("status")
    val jobOfferStatus: Int,
)
