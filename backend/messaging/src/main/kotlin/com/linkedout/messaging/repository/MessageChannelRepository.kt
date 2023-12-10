package com.linkedout.messaging.repository

import com.linkedout.messaging.model.MessageChannel
import com.linkedout.messaging.model.MessageChannelWithLastMessage
import org.springframework.data.r2dbc.repository.Query
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.UUID

interface MessageChannelRepository : ReactiveCrudRepository<MessageChannel, UUID> {
    @Query(
        """
        SELECT mc.*, m.message AS lastmessage
        FROM messagechannel mc
        LEFT JOIN message m ON m.created = (
            SELECT MAX(m2.created)
            FROM message m2
            WHERE m2.messagechannelid = mc.id
            GROUP BY m2.messagechannelid
        )
        WHERE mc.seasonworkerid = :seasonworkerId
    """
    )
    fun findAllAndLastMessageWithSeasonworkerId(seasonworkerId: UUID): Flux<MessageChannelWithLastMessage>

    @Query(
        """
        SELECT mc.*, m.message AS lastmessage
        FROM messagechannel mc
        LEFT JOIN message m ON m.created = (
            SELECT MAX(m2.created)
            FROM message m2
            WHERE m2.messagechannelid = mc.id
            GROUP BY m2.messagechannelid
        )
        WHERE mc.seasonworkerid = :seasonworkerId
        AND mc.id = :messageChannelId
    """
    )
    fun findOneAndLastMessageWithSeasonworkerId(seasonworkerId: UUID, messageChannelId: UUID): Mono<MessageChannelWithLastMessage>

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
        SELECT mc.*, m.message AS lastmessage
        FROM messagechannel mc
        LEFT JOIN message m ON m.created = (
            SELECT MAX(m2.created)
            FROM message m2
            WHERE m2.messagechannelid = mc.id
            GROUP BY m2.messagechannelid
        )
        WHERE mc.seasonworkerid = :seasonworkerId
        AND mc.employerid = :employerId
    """
    )
    fun findOneAndLastMessageWithSeasonworkerIdAndEmployerId(seasonworkerId: UUID, employerId: UUID): Mono<MessageChannelWithLastMessage>

    @Query(
        """
        INSERT INTO messagechannel (seasonworkerid, employerid)
        VALUES (:seasonworkerId, :employerId)
        RETURNING *
    """
    )
    fun saveChannel(seasonworkerId: UUID, employerId: UUID): Mono<MessageChannel>
}
