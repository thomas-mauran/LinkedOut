package com.linkedout.messaging.function.messages

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.messaging.service.MessageChannelService
import com.linkedout.messaging.service.MessageService
import com.linkedout.messaging.utils.MessageDirection
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.models.MessageOuterClass
import com.linkedout.proto.services.Messaging.SendMessageResponse
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
import java.time.ZoneOffset
import java.util.*
import java.util.function.Function

@Component
class SendMessage(
    private val messageService: MessageService,
    private val messageChannelService: MessageChannelService
) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Extract the request
        val request = t.sendMessageRequest
        val userId = UUID.fromString(request.userId)
        val messageChannelId = UUID.fromString(request.messageChannelId)

        // Get the message channel from the database
        val messageChannel = messageChannelService.findOneWithSeasonworkerId(userId, messageChannelId).block()
            ?: return RequestResponseFactory.newFailedResponse("Message channel not found").build()

        // Insert the message into the database
        val reactiveResponse = messageService.saveMessage(userId, messageChannelId, request.content, MessageDirection.fromProto(request.direction))
            .map { message ->
                MessageOuterClass.Message.newBuilder()
                    .setId(message.id.toString())
                    .setDirection(MessageDirection.toProto(message.direction))
                    .setSentAt(message.created.toEpochSecond(ZoneOffset.UTC) * 1000)
                    .setContent(message.message)
                    .build()
            }
            .map { builder ->
                SendMessageResponse.newBuilder()
                    .setMessageChannelId(messageChannelId.toString())
                    .setEmployerId(messageChannel.employerId.toString())
                    .setMessage(builder)
                    .build()
            }

        // Block until the response is ready
        val response = reactiveResponse.block()
            ?: return RequestResponseFactory.newFailedResponse("Unable to send the message", HttpStatus.INTERNAL_SERVER_ERROR).build()

        return RequestResponseFactory.newSuccessfulResponse()
            .setSendMessageResponse(response)
            .build()
    }
}
