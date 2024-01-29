package com.linkedout.recommendation.repository

import com.linkedout.recommendation.entity.JobOfferEntity
import org.springframework.data.neo4j.repository.ReactiveNeo4jRepository
import org.springframework.data.neo4j.repository.query.Query
import reactor.core.publisher.Flux
import java.util.*


interface JobOfferRepository : ReactiveNeo4jRepository<JobOfferEntity, UUID>{
    @Query("MATCH(post:Post) WHERE post.title =~ \$title RETURN post")
    fun findAll(userId: String?): Flux<JobOfferEntity?>?
}
