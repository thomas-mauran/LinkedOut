package com.linkedout.profile.model

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table
import java.time.LocalDate
import java.util.UUID

@Table("availability")
data class Availability(
    @Id
    val id: UUID,
    val userId: UUID,
    val startDate: LocalDate,
    val endDate: LocalDate,
    val addressFirstLine: String,
    val addressZip: String,
    val addressCity: String,
    val range: Int,
    val jobCategoryId: UUID
)
