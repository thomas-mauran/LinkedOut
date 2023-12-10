package com.linkedout.messaging.repository

import com.linkedout.messaging.model.MessageChannel
import org.springframework.data.r2dbc.repository.Query
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.UUID

interface MessageChannelRepository : ReactiveCrudRepository<MessageChannel, UUID> {
    @Query(
        """
        SELECT * FROM messagechannel
        WHERE seasonworkerid = :seasonworkerId
    """
    )
    fun findAllWithSeasonworkerId(seasonworkerId: UUID): Flux<MessageChannel>

    @Query(
        """
        SELECT * FROM messagechannel
        WHERE seasonworkerid = :seasonworkerId
        AND id = :messageChannelId
    """
    )
    fun findOneWithSeasonworkerId(seasonworkerId: UUID, messageChannelId: UUID): Mono<MessageChannel>

    @Query(
        """
        SELECT * FROM messagechannel
        WHERE seasonworkerid = :seasonworkerId
        AND employerid = :employerId
    """
    )
    fun findOneWithSeasonworkerIdAndEmployerId(seasonworkerId: UUID, employerId: UUID): Mono<MessageChannel>

    @Query(
        """
        INSERT INTO messagechannel (seasonworkerid, employerid)
        VALUES (:seasonworkerId, :employerId)
        RETURNING *
    """
    )
    fun saveChannel(seasonworkerId: UUID, employerId: UUID): Mono<MessageChannel>
}
