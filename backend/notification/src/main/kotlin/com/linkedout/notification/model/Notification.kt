package com.linkedout.notification.model

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Column
import org.springframework.data.relational.core.mapping.Table
import java.time.LocalDateTime
import java.util.*

@Table("notification")
data class Notification(
    @Id
    val id: UUID,
    @Column("seasonworkerid")
    val seasonworkerId: UUID,
    val title: String,
    val content: String,
    val created: LocalDateTime
)
