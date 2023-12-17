package com.linkedout.backend.model

data class Profile(
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
    val deletionRequested: Boolean
)
