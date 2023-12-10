package com.linkedout.messaging.service

import com.linkedout.messaging.model.Message
import com.linkedout.messaging.repository.MessageRepository
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import java.util.UUID

@Service
class MessageService(private val messageRepository: MessageRepository) {
    fun findAllWithSeasonworkerIdAndMessageChannelId(seasonworkerId: UUID, messageChannelId: UUID): Flux<Message> {
        return messageRepository.findAllWithSeasonworkerIdAndMessageChannelId(seasonworkerId, messageChannelId)
    }
}
