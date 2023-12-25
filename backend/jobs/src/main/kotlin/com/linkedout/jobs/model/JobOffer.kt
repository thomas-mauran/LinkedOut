package com.linkedout.jobs.model

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Column
import org.springframework.data.relational.core.mapping.Table
import java.time.LocalDate
import java.util.UUID

@Table(name = "joboffer")
data class JobOffer(
    @Id
    val id: UUID,
    val title: String,
    val description: String,
    @Column("startdate")
    val startDate: LocalDate,
    @Column("enddate")
    val endDate: LocalDate,
    val geographicArea: String,
    val job: UUID,
    val company: UUID,
    val salary: Int
)
