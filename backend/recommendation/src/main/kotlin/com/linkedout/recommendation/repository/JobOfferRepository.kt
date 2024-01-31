package com.linkedout.recommendation.repository

import com.linkedout.recommendation.entity.JobOfferEntity
import org.springframework.data.neo4j.repository.ReactiveNeo4jRepository
import org.springframework.data.neo4j.repository.query.Query
import reactor.core.publisher.Flux
import java.util.*
import org.springframework.data.repository.query.Param


interface JobOfferRepository : ReactiveNeo4jRepository<JobOfferEntity, UUID>{
    @Query(
        "MATCH (jobOffer:JobOffer)-[:HAS_JOB]->(j)<-[:RELATED_TO_JOB]-(experience)," +
        "(experience)<-[:HAS_EXPERIENCE]-(profile:Profile {id: \$userId})" +
        "RETURN jobOffer")
    fun getRecommendations(@Param("userId") userId: String?): Flux<JobOfferEntity>
}
