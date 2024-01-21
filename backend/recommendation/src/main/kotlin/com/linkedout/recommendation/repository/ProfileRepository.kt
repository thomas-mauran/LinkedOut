package com.linkedout.recommendation.repository

import com.linkedout.recommendation.entity.ProfileEntity
import org.springframework.data.neo4j.repository.ReactiveNeo4jRepository
import java.util.UUID

interface ProfileRepository : ReactiveNeo4jRepository<ProfileEntity, UUID>
