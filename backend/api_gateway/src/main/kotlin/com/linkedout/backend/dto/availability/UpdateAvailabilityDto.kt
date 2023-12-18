package com.linkedout.backend.dto.availability

import com.linkedout.backend.model.Address
import java.time.LocalDate

data class UpdateAvailabilityDto(
    val startDate: LocalDate?,
    val endDate: LocalDate?,
    val address: Address?,
    val range: Int?,
    val jobCategoryId: String?
)
