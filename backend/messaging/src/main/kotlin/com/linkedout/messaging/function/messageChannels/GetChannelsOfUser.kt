package com.linkedout.messaging.function.messageChannels

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.messaging.converter.messageChannels.MessageChannelWithLastMessageToProto
import com.linkedout.messaging.service.MessageChannelService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Messaging.GetUserMessageChannelsResponse
import org.springframework.stereotype.Component
import java.util.UUID
import java.util.function.Function

@Component
class GetChannelsOfUser(private val messageChannelService: MessageChannelService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Get the message channels from the database
        val reactiveResponse = messageChannelService.findAllWithSeasonworkerId(UUID.fromString(t.getUserMessageChannelsRequest.userId))
            .map { messageChannel ->
                MessageChannelWithLastMessageToProto().convert(messageChannel)
            }
            .reduce(GetUserMessageChannelsResponse.newBuilder()) { builder, messageChannel ->
                builder.addMessageChannels(messageChannel)
                builder
            }
            .map { builder ->
                builder.build()
            }

        // Block until the response is ready
        val response = reactiveResponse.block()
            ?: return RequestResponseFactory.newSuccessfulResponse()
                .setGetUserMessageChannelsResponse(GetUserMessageChannelsResponse.getDefaultInstance())
                .build()

        return RequestResponseFactory.newSuccessfulResponse()
            .setGetUserMessageChannelsResponse(response)
            .build()
    }
}
