package com.linkedout.profile.model

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table
import java.util.UUID

@Table("reference")
data class Reference(
    @Id
    val id: UUID,
    val userId: UUID,
    val firstName: String,
    val lastName: String,
    val addressFirstLine: String,
    val addressZip: String,
    val addressCity: String,
    val phone: String,
    val email: String,
    val companyId: UUID
)
