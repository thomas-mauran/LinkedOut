package com.linkedout.jobs.model

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table
import java.util.UUID

@Table(name = "company")
data class Company(
    @Id
    val id: UUID,
    val name: String
)
