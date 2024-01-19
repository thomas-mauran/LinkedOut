package com.linkedout.recommendation.repository

import com.linkedout.recommendation.entity.JobEntity
import org.springframework.data.neo4j.repository.ReactiveNeo4jRepository
import java.util.UUID

interface JobRepository : ReactiveNeo4jRepository<JobEntity, UUID>
