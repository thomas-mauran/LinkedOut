package com.linkedout.recommendation.entity

import org.springframework.data.neo4j.core.schema.Id
import org.springframework.data.neo4j.core.schema.Node
import java.util.*

@Node("Profile")
data class ProfileEntity(
    @Id
    val id: UUID,
)
