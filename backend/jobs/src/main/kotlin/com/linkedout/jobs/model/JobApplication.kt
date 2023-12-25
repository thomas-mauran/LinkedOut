package com.linkedout.jobs.model

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Column
import org.springframework.data.relational.core.mapping.Table
import java.util.UUID

@Table(name = "jobapplication")
data class JobApplication(
    @Id
    val id: UUID? = null,
    @Column("offerid")
    val jobOfferId: UUID,
    @Column("userid")
    val userId: UUID,
    val status: Int
)
