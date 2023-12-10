package com.linkedout.messaging.model

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Column
import java.util.UUID

data class MessageChannelWithLastMessage(
    @Id
    val id: UUID,
    @Column("seasonworkerid")
    val seasonworkerId: UUID,
    @Column("employerid")
    val employerId: UUID,
    @Column("lastmessage")
    val lastMessage: String?
)
