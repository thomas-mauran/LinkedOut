package com.linkedout.recommendation.entity

import org.springframework.data.neo4j.core.schema.Id
import org.springframework.data.neo4j.core.schema.Node
import java.util.*

@Node("JobOffer")
data class JobOfferEntity(
    @Id
    val id: UUID
//    val geographicArea: Date,
//    val createdAt: Timestamp
)
