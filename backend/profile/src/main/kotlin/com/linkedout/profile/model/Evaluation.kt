package com.linkedout.profile.model

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table
import java.time.LocalDateTime
import java.util.UUID

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
