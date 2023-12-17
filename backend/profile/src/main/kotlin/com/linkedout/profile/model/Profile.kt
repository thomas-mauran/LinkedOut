package com.linkedout.profile.model

import com.linkedout.profile.utils.ProfileGender
import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table
import java.time.LocalDate
import java.util.UUID

@Table("profile")
data class Profile(
    @Id
    val id: UUID,
    val userId: UUID,
    val firstName: String,
    val lastName: String,
    val gender: ProfileGender,
    val birthday: LocalDate,
    val nationality: String,
    val addressFirstLine: String,
    val addressZip: String,
    val addressCity: String,
    val phone: String,
    val email: String,
    val shortBio: String,
    val deletionRequested: Boolean
)
