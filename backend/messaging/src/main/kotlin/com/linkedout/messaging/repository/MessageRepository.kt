package com.linkedout.messaging.repository

import com.linkedout.messaging.model.Message
import org.springframework.data.r2dbc.repository.Query
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.UUID

interface MessageRepository : ReactiveCrudRepository<Message, UUID> {
    @Query(
        """
        SELECT m.* FROM message m
        JOIN messagechannel mc on mc.id = m.messagechannelid
        WHERE m.messagechannelid = :messageChannelId
        AND mc.seasonworkerid = :seasonworkerId
    """
    )
    fun findAllWithSeasonworkerIdAndMessageChannelId(seasonworkerId: UUID, messageChannelId: UUID): Flux<Message>

    @Query(
        """
        SELECT EXISTS(
            SELECT 1 FROM messagechannel 
            WHERE id = :messageChannelId
            AND seasonworkerid = :seasonworkerId
        )
    """
    )
    fun existsWithSeasonworkerIdAndMessageChannelId(seasonworkerId: UUID, messageChannelId: UUID): Mono<Boolean>

    @Query(
        """
        INSERT INTO message (messagechannelid, message, direction)
        VALUES (:messageChannelId, :content, :direction)
        RETURNING *
    """
    )
    fun saveMessage(messageChannelId: UUID, content: String, direction: Int): Mono<Message>
}
