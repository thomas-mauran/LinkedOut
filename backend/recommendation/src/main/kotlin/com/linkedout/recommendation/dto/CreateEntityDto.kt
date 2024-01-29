package com.linkedout.recommendation.dto

import java.util.UUID

data class CreateEntityDto(
    val id: UUID,

    val job: String,

    val profile: String
)
