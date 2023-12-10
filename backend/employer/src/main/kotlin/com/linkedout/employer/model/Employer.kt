package com.linkedout.employer.model

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Column
import org.springframework.data.relational.core.mapping.Table
import java.util.UUID

@Table("employer")
data class Employer(
    @Id
    val id: UUID,
    @Column("firstname")
    val firstName: String,
    @Column("lastname")
    val lastName: String,
    val picture: String,
    val phone: String
)
