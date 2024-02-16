package com.linkedout.backend.model

import java.time.LocalDate
import java.util.*

data class JobOffer(
    val id: String,
    val title: String,
    val description: String,
    val startDate: LocalDate,
    val endDate: LocalDate,
    val geographicArea: String,
    val job: Job,
    val company: Company,
    val salary: Int,
    val status: Int,
    val employerId: String
)
