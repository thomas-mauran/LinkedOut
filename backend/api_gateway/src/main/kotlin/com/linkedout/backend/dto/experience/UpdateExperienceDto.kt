package com.linkedout.backend.dto.experience

import com.linkedout.backend.model.Address
import java.time.LocalDate

data class UpdateExperienceDto(
    val startDate: LocalDate?,
    val endDate: LocalDate?,
    val address: Address?,
    val company: Company?,
    val jobId: String?
) {
    data class Company(
        val name: String
    )
}
