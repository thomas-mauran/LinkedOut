package com.linkedout.messaging.service

import com.linkedout.messaging.model.Message
import com.linkedout.messaging.repository.MessageRepository
import com.linkedout.messaging.utils.MessageDirection
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.UUID

@Service
class MessageService(private val messageRepository: MessageRepository) {
    fun findAllWithSeasonworkerIdAndMessageChannelId(seasonworkerId: UUID, messageChannelId: UUID): Flux<Message> {
        return messageRepository.findAllWithSeasonworkerIdAndMessageChannelId(seasonworkerId, messageChannelId)
    }

    fun saveMessage(seasonworkerId: UUID, messageChannelId: UUID, content: String, direction: MessageDirection): Mono<Message> {
        // Ensure that the seasonworker is a member of the message channel
        if (messageRepository.existsWithSeasonworkerIdAndMessageChannelId(seasonworkerId, messageChannelId).block() != true) {
            throw Exception("Seasonworker is not a member of the message channel")
        }

        return messageRepository.saveMessage(messageChannelId, content, direction.ordinal)
    }
}
