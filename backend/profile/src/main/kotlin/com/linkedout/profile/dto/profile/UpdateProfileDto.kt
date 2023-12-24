package com.linkedout.profile.dto.profile

import com.linkedout.profile.utils.ProfileGender
import java.time.LocalDate

data class UpdateProfileDto(
    val firstName: String?,
    val lastName: String?,
    val gender: ProfileGender?,
    val birthday: LocalDate?,
    val nationality: String?,
    val addressFirstLine: String?,
    val addressZip: String?,
    val addressCity: String?,
    val phone: String?,
    val email: String?,
    val shortBio: String?
)
