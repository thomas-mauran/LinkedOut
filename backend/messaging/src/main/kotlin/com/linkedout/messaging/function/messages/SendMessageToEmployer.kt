package com.linkedout.messaging.function.messages

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.messaging.service.MessageChannelService
import com.linkedout.messaging.service.MessageService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.models.MessageOuterClass
import com.linkedout.proto.services.Messaging.SendMessageToEmployerResponse
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
import java.time.ZoneOffset
import java.util.*
import java.util.function.Function

@Component
class SendMessageToEmployer(
    private val messageService: MessageService,
    private val messageChannelService: MessageChannelService
) : Function<Request, Response> {
    override fun apply(t: Request): Response {
        // Extract the request
        val request = t.sendMessageToEmployerRequest
        val userId = UUID.fromString(request.userId)
        val employerId = UUID.fromString(request.employerId)

        // Ensure that the message channel exists in the database
        val messageChannel = try {
            messageChannelService.ensureExists(userId, employerId)
                .block()
        } catch (e: Exception) {
            return RequestResponseFactory.newFailedResponse(e.message ?: "Unknown error").build()
        }
            ?: return RequestResponseFactory.newFailedResponse("Message channel could not be created").build()

        // Insert the message into the database
        val responseMono = try {
            messageService.saveMessage(userId, messageChannel.id, request.content, 0)
                .map { message ->
                    MessageOuterClass.Message.newBuilder()
                        .setId(message.id.toString())
                        .setDirectionValue(message.direction)
                        .setSentAt(message.created.toEpochSecond(ZoneOffset.UTC) * 1000)
                        .setContent(message.message)
                        .build()
                }
                .map { builder ->
                    SendMessageToEmployerResponse.newBuilder()
                        .setMessageChannelId(messageChannel.id.toString())
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
            .setSendMessageToEmployerResponse(response)
            .build()
    }
}
