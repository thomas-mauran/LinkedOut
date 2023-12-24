package com.linkedout.backend.dto.profile

import com.linkedout.backend.model.Address
import java.time.LocalDate

data class SetProfileDto(
    val firstName: String,
    val lastName: String,
    val gender: Int,
    val birthday: LocalDate,
    val nationality: String,
    val address: Address,
    val phone: String,
    val email: String,
    val shortBiography: String
)
