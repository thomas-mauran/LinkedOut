package com.linkedout.recommendation.repository

import com.linkedout.recommendation.entity.JobOfferEntity
import org.springframework.data.neo4j.repository.ReactiveNeo4jRepository
import java.util.UUID

interface JobOfferRepository : ReactiveNeo4jRepository<JobOfferEntity, UUID>
