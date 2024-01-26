package com.linkedout.recommendation.entity

import org.springframework.data.neo4j.core.schema.Id
import org.springframework.data.neo4j.core.schema.Node
import org.springframework.data.neo4j.core.schema.Relationship
import java.util.*

@Node("Experience")
data class ExperienceEntity(
    @Id
    val id: UUID,

    @Relationship(type = "HAS_JOB", direction = Relationship.Direction.OUTGOING)
    val job: JobEntity,

    @Relationship(type = "HAS_PROFILE", direction = Relationship.Direction.INCOMING)
    val profile: ProfileEntity
)
