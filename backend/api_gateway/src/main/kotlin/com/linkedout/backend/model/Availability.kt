package com.linkedout.backend.model

data class Availability(
    val id: String,
    val startDate: String,
    val endDate: String,
    val address: Address,
    val range: Int,
    val jobCategory: JobCategory
)
