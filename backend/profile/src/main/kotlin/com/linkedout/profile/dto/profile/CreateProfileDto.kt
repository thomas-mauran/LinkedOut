package com.linkedout.profile.dto.profile

import java.time.LocalDate

data class CreateProfileDto(
    val firstName: String,
    val lastName: String,
    val gender: Int,
    val birthday: LocalDate,
    val nationality: String,
    val addressFirstLine: String,
    val addressZip: String,
    val addressCity: String,
    val phone: String,
    val email: String,
    val shortBio: String
)
