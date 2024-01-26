package com.linkedout.recommendation.repository

import com.linkedout.recommendation.entity.ExperienceEntity
import org.springframework.data.neo4j.repository.ReactiveNeo4jRepository
import java.util.UUID

interface ExperienceRepository : ReactiveNeo4jRepository<ExperienceEntity, UUID>
