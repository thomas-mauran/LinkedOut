package com.linkedout.messaging.function.messages

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.messaging.service.MessageChannelService
import com.linkedout.messaging.service.MessageService
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
    override fun apply(t: Request): Response {
        // Extract the request
        val request = t.sendMessageRequest
        val userId = UUID.fromString(request.userId)
        val messageChannelId = UUID.fromString(request.messageChannelId)

        // Get the message channel from the database
        val messageChannel = try {
            messageChannelService.findOneWithSeasonworkerId(userId, messageChannelId)
                .block()
        } catch (e: Exception) {
            return RequestResponseFactory.newFailedResponse(e.message ?: "Unknown error").build()
        }
            ?: return RequestResponseFactory.newFailedResponse("Message channel not found").build()

        // Insert the message into the database
        val responseMono = try {
            messageService.saveMessage(userId, messageChannelId, request.content, request.directionValue)
                .map { message ->
                    MessageOuterClass.Message.newBuilder()
                        .setId(message.id.toString())
                        .setDirectionValue(message.direction)
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
        } catch (e: Exception) {
            return RequestResponseFactory.newFailedResponse(e.message ?: "Unknown error").build()
        }

        // Block until the response is ready
        val response = try {
            responseMono.block()
        } catch (e: Exception) {
            return RequestResponseFactory.newFailedResponse(e.message ?: "Unknown error").build()
        }
            ?: return RequestResponseFactory.newFailedResponse("Unable to send the message", HttpStatus.INTERNAL_SERVER_ERROR).build()

        return RequestResponseFactory.newSuccessfulResponse()
            .setSendMessageResponse(response)
            .build()
    }
}
