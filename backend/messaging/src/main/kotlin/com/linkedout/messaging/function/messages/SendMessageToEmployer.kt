package com.linkedout.messaging.function.messages

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.messaging.converter.messages.MessageToProto
import com.linkedout.messaging.service.MessageChannelService
import com.linkedout.messaging.service.MessageService
import com.linkedout.messaging.utils.MessageDirection
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Messaging.SendMessageToEmployerResponse
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
import java.util.*
import java.util.function.Function

@Component
class SendMessageToEmployer(
    private val messageService: MessageService,
    private val messageChannelService: MessageChannelService
) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Extract the request
        val request = t.sendMessageToEmployerRequest
        val userId = UUID.fromString(request.userId)
        val employerId = UUID.fromString(request.employerId)

        // Ensure that the message channel exists in the database
        val messageChannel = messageChannelService.ensureExists(userId, employerId).block()
            ?: return RequestResponseFactory.newFailedResponse("Message channel could not be created").build()

        // Insert the message into the database
        val reactiveResponse = messageService.saveMessage(userId, messageChannel.id, request.content, MessageDirection.ToEmployer)
            .map { message ->
                MessageToProto().convert(message)
            }
            .map { builder ->
                SendMessageToEmployerResponse.newBuilder()
                    .setMessageChannelId(messageChannel.id.toString())
                    .setEmployerId(messageChannel.employerId.toString())
                    .setMessage(builder)
                    .build()
            }

        // Block until the response is ready
        val response = reactiveResponse.block()
            ?: return RequestResponseFactory.newFailedResponse("Unable to send the message", HttpStatus.INTERNAL_SERVER_ERROR).build()

        return RequestResponseFactory.newSuccessfulResponse()
            .setSendMessageToEmployerResponse(response)
            .build()
    }
}
