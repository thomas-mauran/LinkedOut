package com.linkedout.backend.model

data class EmployeeEvaluation(
    val id: String,
    val employerFirstName: String,
    val employerLastName: String,
    val score: Int,
    val review: String,
    val createdAt: String
)
