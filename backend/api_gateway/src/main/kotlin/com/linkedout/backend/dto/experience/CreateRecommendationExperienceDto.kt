package com.linkedout.backend.dto.experience

import java.util.UUID

data class CreateRecommendationExperienceDto(
    val id: UUID,
    val profileId: UUID,
    val jobId: UUID,
    val jobTitle: String,
    val jobCategory: String
)
