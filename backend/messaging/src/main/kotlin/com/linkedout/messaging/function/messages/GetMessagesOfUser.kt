package com.linkedout.messaging.function.messages

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.messaging.service.MessageChannelService
import com.linkedout.messaging.service.MessageService
import com.linkedout.messaging.utils.MessageDirection
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.models.MessageOuterClass.Message
import com.linkedout.proto.services.Messaging.GetUserMessagesResponse
import org.springframework.stereotype.Component
import java.time.ZoneOffset
import java.util.*
import java.util.function.Function

@Component
class GetMessagesOfUser(
    private val messageService: MessageService,
    private val messageChannelService: MessageChannelService
) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Extract the request
        val request = t.getUserMessagesRequest
        val userId = UUID.fromString(request.userId)
        val messageChannelId = UUID.fromString(request.messageChannelId)

        // Get the message channel from the database
        val messageChannel = messageChannelService.findOneWithSeasonworkerId(userId, messageChannelId).block()
            ?: return RequestResponseFactory.newFailedResponse("Message channel not found").build()

        // Get the messages from the database
        val reactiveResponse = messageService.findAllWithSeasonworkerIdAndMessageChannelId(userId, messageChannelId)
            .map { message ->
                Message.newBuilder()
                    .setId(message.id.toString())
                    .setDirection(MessageDirection.toProto(message.direction))
                    .setSentAt(message.created.toEpochSecond(ZoneOffset.UTC) * 1000)
                    .setContent(message.message)
                    .build()
            }
            .reduce(GetUserMessagesResponse.newBuilder()) { builder, message ->
                builder.addMessages(message)
                builder
            }
            .map { builder ->
                builder.setMessageChannelId(request.messageChannelId)
                builder.setEmployerId(messageChannel.employerId.toString())
                builder.build()
            }

        // Block until the response is ready
        val response = reactiveResponse.block()
            ?: return RequestResponseFactory.newSuccessfulResponse()
                .setGetUserMessagesResponse(GetUserMessagesResponse.getDefaultInstance())
                .build()

        return RequestResponseFactory.newSuccessfulResponse()
            .setGetUserMessagesResponse(response)
            .build()
    }
}
