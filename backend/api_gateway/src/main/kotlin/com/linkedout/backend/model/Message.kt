package com.linkedout.backend.model

data class Message(
    val id: String,
    val channelId: String,
    val employerId: String,
    val direction: Int,
    val sentAt: String,
    val content: String
)
