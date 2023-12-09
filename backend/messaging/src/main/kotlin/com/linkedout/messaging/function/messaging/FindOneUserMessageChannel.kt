package com.linkedout.messaging.function.messaging

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.messaging.service.MessageChannelService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.models.MessageChannelOuterClass
import com.linkedout.proto.services.Messaging.GetUserMessageChannelByIdResponse
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
import java.util.*
import java.util.function.Function

@Component
class FindOneUserMessageChannel(private val messageChannelService: MessageChannelService) : Function<Request, Response> {
    override fun apply(t: Request): Response {
        // Get the message channel from the database
        val request = t.getUserMessageChannelByIdRequest
        val responseMono = messageChannelService.findOneWithSeasonworkerId(UUID.fromString(request.userId), UUID.fromString(request.messageChannelId))
            .map { messageChannel ->
                // TODO: Get the last message
                MessageChannelOuterClass.MessageChannel.newBuilder()
                    .setId(messageChannel.id.toString())
                    .setEmployerId(messageChannel.employerId.toString())
                    .setLastMessage("<TODO>")
                    .build()
            }
            .map { messageChannel ->
                GetUserMessageChannelByIdResponse.newBuilder()
                    .setMessageChannel(messageChannel)
                    .build()
            }

        // Block until the response is ready
        val response = try {
            responseMono.block()
        } catch (e: Exception) {
            return RequestResponseFactory.newFailedResponse(e.message ?: "Unknown error").build()
        }
            ?: return RequestResponseFactory.newFailedResponse("Message channel not found", HttpStatus.NOT_FOUND).build()

        return RequestResponseFactory.newSuccessfulResponse()
            .setGetUserMessageChannelByIdResponse(response)
            .build()
    }
}
