package com.linkedout.jobs.model

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Column
import org.springframework.data.relational.core.mapping.Table
import java.util.UUID

@Table(name = "job")
data class Job(
        @Id
        val id: UUID,
        val title: String,
        val category: UUID
)
