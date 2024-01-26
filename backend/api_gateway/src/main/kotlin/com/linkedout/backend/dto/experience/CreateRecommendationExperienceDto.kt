package com.linkedout.backend.dto.experience

import com.linkedout.backend.model.JobCategory
import java.util.UUID

data class CreateRecommendationExperienceDto(
    val id: UUID,
    val profileId: UUID,
    val jobId: UUID,
    val jobTitle: String,
    val jobCategory: String
)