package com.linkedout.backend.model

data class Reference(
    val id: String,
    val firstName: String,
    val lastName: String,
    val address: Address,
    val phone: String,
    val email: String,
    val company: Company
)
