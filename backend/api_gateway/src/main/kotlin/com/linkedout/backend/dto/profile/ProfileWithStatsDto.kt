package com.linkedout.backend.dto.profile

import com.linkedout.backend.model.Address

data class ProfileWithStatsDto(
    val id: String,
    val firstName: String,
    val lastName: String,
    val gender: Int,
    val birthday: String,
    val nationality: String,
    val address: Address,
    val phone: String,
    val email: String,
    val shortBiography: String,
    val deletionRequested: Boolean,
    val nbExperiences: Long,
    val nbReviews: Long,
    val averageRating: Double
)
