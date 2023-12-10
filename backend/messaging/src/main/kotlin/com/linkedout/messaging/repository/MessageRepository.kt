package com.linkedout.messaging.repository

import com.linkedout.messaging.model.Message
import org.springframework.data.r2dbc.repository.Query
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import reactor.core.publisher.Flux
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
}
