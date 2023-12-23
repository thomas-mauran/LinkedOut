package com.linkedout.profile.dto.experience

import java.time.LocalDate
import java.util.UUID

data class CreateExperienceDto(
    val startDate: LocalDate,
    val endDate: LocalDate,
    val companyAddressFirstLine: String,
    val companyAddressZip: String,
    val companyAddressCity: String,
    val companyId: UUID,
    val jobId: UUID
)
