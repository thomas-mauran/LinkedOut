package com.linkedout.recommendation.dto

import java.util.UUID

data class CreateJobDto(
    val id: UUID,
    val title: String,
    val category: String
)
