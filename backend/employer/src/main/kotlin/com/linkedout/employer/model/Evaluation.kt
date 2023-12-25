package com.linkedout.employer.model

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table
import java.time.LocalDateTime
import java.util.*

@Table("evaluation")
data class Evaluation(
    @Id
    val id: UUID,
    val userId: UUID,
    val employerId: UUID,
    val score: Int,
    val comment: String,
    val createdAt: LocalDateTime
)
