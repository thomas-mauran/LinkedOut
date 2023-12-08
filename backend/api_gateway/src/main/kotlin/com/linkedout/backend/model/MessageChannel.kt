package com.linkedout.backend.model

data class MessageChannel(
    val id: String,
    val employer: Employer,
    val lastMessage: String
)
