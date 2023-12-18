package com.linkedout.profile.dto.availability

import java.time.LocalDate
import java.util.UUID

data class UpdateAvailabilityDto(
    val startDate: LocalDate?,
    val endDate: LocalDate?,
    val addressFirstLine: String?,
    val addressZip: String?,
    val addressCity: String?,
    val range: Int?,
    val jobCategoryId: UUID?
)
