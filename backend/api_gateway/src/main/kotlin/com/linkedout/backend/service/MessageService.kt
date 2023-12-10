package com.linkedout.backend.service

import com.linkedout.backend.model.Message
import com.linkedout.common.service.NatsService
import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.proto.services.Messaging
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.time.format.DateTimeFormatter
import java.util.*

@Service
class MessageService(
    private val natsService: NatsService,
    @Value("\${app.services.messages.subjects.findAllOfUserInChannel}") private val findAllOfUserInChannelSubject: String
) {
    fun findAllMessagesOfUserInChannel(requestId: String, userId: String, channelId: String): List<Message> {
        // Request messages from the messaging service
        val request = RequestResponseFactory.newRequest(requestId)
            .setGetUserMessagesRequest(
                Messaging.GetUserMessagesRequest.newBuilder()
                    .setUserId(userId)
                    .setMessageChannelId(channelId)
            )
            .build()

        val response = natsService.requestWithReply(findAllOfUserInChannelSubject, request)

        // Handle the response
        if (!response.hasGetUserMessagesResponse()) {
            throw Exception("Invalid response")
        }

        val getUserMessagesResponse = response.getUserMessagesResponse

        return getUserMessagesResponse.messagesList.map { message ->
            val date = Date(message.sentAt)

            Message(
                message.id,
                getUserMessagesResponse.messageChannelId,
                getUserMessagesResponse.employerId,
                message.directionValue,
                DateTimeFormatter.ISO_INSTANT.format(date.toInstant()),
                message.content
            )
        }
    }
}
