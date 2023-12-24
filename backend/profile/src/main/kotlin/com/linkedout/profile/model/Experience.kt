package com.linkedout.profile.model

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table
import java.time.LocalDate
import java.util.*

@Table("experience")
data class Experience(
    @Id
    val id: UUID,
    val userId: UUID,
    val startDate: LocalDate,
    val endDate: LocalDate,
    val companyAddressFirstLine: String,
    val companyAddressZip: String,
    val companyAddressCity: String,
    val companyId: UUID,
    val jobId: UUID
)
