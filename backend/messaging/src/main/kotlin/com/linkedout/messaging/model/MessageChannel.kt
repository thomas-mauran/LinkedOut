package com.linkedout.messaging.model

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Column
import org.springframework.data.relational.core.mapping.Table
import java.util.UUID

@Table("messagechannel")
data class MessageChannel(
    @Id
    val id: UUID,
    @Column("seasonworkerid")
    val seasonworkerId: UUID,
    @Column("employerid")
    val employerId: UUID
)
