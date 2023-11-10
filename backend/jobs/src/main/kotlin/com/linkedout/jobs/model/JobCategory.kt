package com.linkedout.jobs.model

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Column
import org.springframework.data.relational.core.mapping.Table
import java.util.UUID

@Table(name = "jobCategory")
data class JobCategory(
        @Id
        @Column("category_id")
        val id: UUID,
        val title: String,
)