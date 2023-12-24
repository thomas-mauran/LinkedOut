package com.linkedout.messaging.function.messageChannels

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.messaging.converter.messageChannels.MessageChannelWithLastMessageToProto
import com.linkedout.messaging.service.MessageChannelService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Messaging.GetUserMessageChannelResponse
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
import java.util.*
import java.util.function.Function

@Component
class GetChannelOfUser(private val messageChannelService: MessageChannelService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Get the message channel from the database
        val request = t.getUserMessageChannelRequest
        val reactiveResponse = messageChannelService.findOneWithSeasonworkerId(UUID.fromString(request.userId), UUID.fromString(request.messageChannelId))
            .map { messageChannel ->
                MessageChannelWithLastMessageToProto().convert(messageChannel)
            }
            .map { messageChannel ->
                GetUserMessageChannelResponse.newBuilder()
                    .setMessageChannel(messageChannel)
                    .build()
            }

        // Block until the response is ready
        val response = reactiveResponse.block()
            ?: return RequestResponseFactory.newFailedResponse("Message channel not found", HttpStatus.NOT_FOUND).build()

        return RequestResponseFactory.newSuccessfulResponse()
            .setGetUserMessageChannelResponse(response)
            .build()
    }
}
