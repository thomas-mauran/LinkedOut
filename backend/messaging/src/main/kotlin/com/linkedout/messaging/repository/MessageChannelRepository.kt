package com.linkedout.messaging.repository

import com.linkedout.messaging.model.MessageChannel
import org.springframework.data.r2dbc.repository.Query
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import reactor.core.publisher.Flux
import java.util.UUID

interface MessageChannelRepository : ReactiveCrudRepository<MessageChannel, UUID> {
    @Query(
        """
        SELECT * FROM messagechannel
        WHERE seasonworkerid = :seasonworkerId
    """
    )
    fun findAllWithSeasonworkerId(seasonworkerId: UUID): Flux<MessageChannel>
}
