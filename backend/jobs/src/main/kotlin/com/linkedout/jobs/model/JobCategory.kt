package com.linkedout.jobs.model

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table
import java.util.UUID

@Table(name = "jobcategory")
data class JobCategory(
    @Id
    val id: UUID,
    val title: String
)
