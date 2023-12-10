package com.linkedout.messaging.service

import com.linkedout.messaging.model.MessageChannel
import com.linkedout.messaging.repository.MessageChannelRepository
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.UUID

@Service
class MessageChannelService(private val messageChannelRepository: MessageChannelRepository) {
    fun findAllWithSeasonworkerId(seasonworkerId: UUID): Flux<MessageChannel> {
        return messageChannelRepository.findAllWithSeasonworkerId(seasonworkerId)
    }

    fun findOneWithSeasonworkerId(seasonworkerId: UUID, messageChannelId: UUID): Mono<MessageChannel> {
        return messageChannelRepository.findOneWithSeasonworkerId(seasonworkerId, messageChannelId)
    }

    fun findOneWithSeasonworkerIdAndEmployerId(seasonworkerId: UUID, employerId: UUID): Mono<MessageChannel> {
        return messageChannelRepository.findOneWithSeasonworkerIdAndEmployerId(seasonworkerId, employerId)
    }

    fun ensureExists(seasonworkerId: UUID, employerId: UUID): Mono<MessageChannel> {
        return messageChannelRepository.findOneWithSeasonworkerIdAndEmployerId(seasonworkerId, employerId)
            .switchIfEmpty(messageChannelRepository.saveChannel(seasonworkerId, employerId))
    }
}
