package com.linkedout.recommendation.repository

import com.linkedout.recommendation.entity.ExperienceEntity
import org.springframework.data.neo4j.repository.ReactiveNeo4jRepository
import org.springframework.data.neo4j.repository.query.Query
import org.springframework.data.repository.query.Param
import reactor.core.publisher.Mono
import java.util.*

import org.springframework.stereotype.Service

@Service
interface ExperienceRepository : ReactiveNeo4jRepository<ExperienceEntity, UUID> {
    @Query(
        "MATCH (p:Profile {id: \$profileId}) MATCH (j:Job {id: \$jobId}) \n" +
                "CREATE (e:Experience {id: \$experienceId}) \n" +
                "MERGE (p)-[:HAS_EXPERIENCE]->(e) \n" +
                "MERGE (e)-[:RELATED_TO_JOB]->(j) \n" +
                "RETURN e"
    )
    fun createExperience(@Param("profileId") profileId: String, @Param("jobId") jobId: String, @Param("experienceId") experienceId: UUID): Mono<ExperienceEntity>
}
