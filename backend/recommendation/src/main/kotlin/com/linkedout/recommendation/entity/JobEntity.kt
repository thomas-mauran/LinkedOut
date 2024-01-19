package com.linkedout.recommendation.entity

import org.springframework.data.neo4j.core.schema.Id
import org.springframework.data.neo4j.core.schema.Node
import java.util.*

@Node("Job")
data class JobEntity(
    @Id
    val id: UUID,
    val title: String,
    val category: String,
)
