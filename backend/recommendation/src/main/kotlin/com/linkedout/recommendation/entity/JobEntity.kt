package com.linkedout.recommendation.entity

import org.springframework.data.neo4j.core.schema.Id
import org.springframework.data.neo4j.core.schema.Node
import org.springframework.data.neo4j.core.schema.Relationship
import java.util.*

@Node("Job")
data class JobEntity(
    @Id
    val id: UUID,
    val title: String,

    @Relationship(type = "BELONGS_TO", direction = Relationship.Direction.OUTGOING)
    val category: JobCategory,
)
