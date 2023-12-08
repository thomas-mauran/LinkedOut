package com.linkedout.messaging.function.messaging

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.messaging.service.MessageChannelService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.models.MessageChannelOuterClass.MessageChannel
import com.linkedout.proto.services.Messaging.GetUserMessageChannelsResponse
import org.springframework.stereotype.Component
import java.util.UUID
import java.util.function.Function

@Component
class FindAllUserMessageChannels(private val messageChannelService: MessageChannelService) : Function<Request, Response> {
    override fun apply(t: Request): Response {
        // Get the message channels from the database
        val responseMono = messageChannelService.findAllWithSeasonworkerId(UUID.fromString(t.getUserMessageChannelsRequest.userId))
            .map { messageChannel ->
                // TODO: Get the last message
                MessageChannel.newBuilder()
                    .setId(messageChannel.id.toString())
                    .setEmployerId(messageChannel.employerId.toString())
                    .setLastMessage("<TODO>")
                    .build()
            }
            .reduce(GetUserMessageChannelsResponse.newBuilder()) { builder, messageChannel ->
                builder.addMessageChannels(messageChannel)
                builder
            }
            .map { builder ->
                builder.build()
            }

        // Block until the response is ready
        val response = try {
            responseMono.block()
        } catch (e: Exception) {
            return RequestResponseFactory.newFailedResponse(e.message ?: "Unknown error").build()
        }
            ?: return RequestResponseFactory.newSuccessfulResponse()
                .setGetUserMessageChannelsResponse(GetUserMessageChannelsResponse.getDefaultInstance())
                .build()

        return RequestResponseFactory.newSuccessfulResponse()
            .setGetUserMessageChannelsResponse(response)
            .build()
    }
}
