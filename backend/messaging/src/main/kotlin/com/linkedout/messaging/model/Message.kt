package com.linkedout.messaging.model

import com.linkedout.messaging.utils.MessageDirection
import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Column
import org.springframework.data.relational.core.mapping.Table
import java.time.LocalDateTime
import java.util.UUID

@Table("message")
data class Message(
    @Id
    val id: UUID,
    @Column("messagechannelid")
    val messageChannelId: UUID,
    val direction: MessageDirection,
    val message: String,
    val created: LocalDateTime
)
