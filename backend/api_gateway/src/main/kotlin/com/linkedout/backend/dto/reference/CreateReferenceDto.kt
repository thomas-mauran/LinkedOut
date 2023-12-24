package com.linkedout.backend.dto.reference

import com.linkedout.backend.model.Address

data class CreateReferenceDto(
    val firstName: String,
    val lastName: String,
    val address: Address,
    val phone: String,
    val email: String,
    val company: Company
) {
    data class Company(
        val name: String
    )
}
