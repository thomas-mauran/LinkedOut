package com.linkedout.backend.model

data class Experience(
    val id: String,
    val startDate: String,
    val endDate: String,
    val address: Address,
    val company: Company,
    val job: Job
)
