package com.linkedout.profile.dto.reference

import java.util.UUID

data class UpdateReferenceDto(
    val firstName: String?,
    val lastName: String?,
    val addressFirstLine: String?,
    val addressZip: String?,
    val addressCity: String?,
    val phone: String?,
    val email: String?,
    val companyId: UUID?
)
