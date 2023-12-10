package com.linkedout.backend.service

import com.linkedout.backend.model.Message
import com.linkedout.common.service.NatsService
import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.proto.models.MessageOuterClass
import com.linkedout.proto.services.Messaging
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.time.format.DateTimeFormatter
import java.util.*

@Service
class MessageService(
    private val natsService: NatsService,
    @Value("\${app.services.messages.subjects.findAllOfUserInChannel}") private val findAllOfUserInChannelSubject: String,
    @Value("\${app.services.messages.subjects.sendMessage}") private val sendMessageSubject: String,
    @Value("\${app.services.messages.subjects.sendMessageToEmployer}") private val sendMessageToEmployerSubject: String
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

    fun sendMessage(requestId: String, userId: String, channelId: String, content: String): Message {
        // Send the message using the messaging service
        val request = RequestResponseFactory.newRequest(requestId)
            .setSendMessageRequest(
                Messaging.SendMessageRequest.newBuilder()
                    .setUserId(userId)
                    .setMessageChannelId(channelId)
                    .setContent(content)
                    .setDirection(MessageOuterClass.Message.Direction.ToEmployer)
            )
            .build()

        val response = natsService.requestWithReply(sendMessageSubject, request)

        // Handle the response
        if (!response.hasSendMessageResponse()) {
            throw Exception("Invalid response")
        }

        val sendMessageResponse = response.sendMessageResponse
        val sentAt = Date(sendMessageResponse.message.sentAt)

        return Message(
            sendMessageResponse.message.id,
            sendMessageResponse.messageChannelId,
            sendMessageResponse.employerId,
            sendMessageResponse.message.directionValue,
            DateTimeFormatter.ISO_INSTANT.format(sentAt.toInstant()),
            sendMessageResponse.message.content
        )
    }

    fun sendMessageToEmployer(requestId: String, userId: String, employerId: String, content: String): Message {
        // Send the message using the messaging service
        val request = RequestResponseFactory.newRequest(requestId)
            .setSendMessageToEmployerRequest(
                Messaging.SendMessageToEmployerRequest.newBuilder()
                    .setUserId(userId)
                    .setEmployerId(employerId)
                    .setContent(content)
            )
            .build()

        val response = natsService.requestWithReply(sendMessageToEmployerSubject, request)

        // Handle the response
        if (!response.hasSendMessageToEmployerResponse()) {
            throw Exception("Invalid response")
        }

        val sendMessageToEmployerResponse = response.sendMessageToEmployerResponse
        val sentAt = Date(sendMessageToEmployerResponse.message.sentAt)

        return Message(
            sendMessageToEmployerResponse.message.id,
            sendMessageToEmployerResponse.messageChannelId,
            sendMessageToEmployerResponse.employerId,
            sendMessageToEmployerResponse.message.directionValue,
            DateTimeFormatter.ISO_INSTANT.format(sentAt.toInstant()),
            sendMessageToEmployerResponse.message.content
        )
    }
}
