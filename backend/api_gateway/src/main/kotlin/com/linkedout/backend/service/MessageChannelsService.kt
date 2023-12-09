package com.linkedout.backend.service

import com.linkedout.backend.model.Employer
import com.linkedout.backend.model.MessageChannel
import com.linkedout.common.service.NatsService
import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.proto.services.Messaging
import com.linkedout.proto.services.Messaging.GetUserMessageChannelsRequest
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Service
class MessageChannelsService(
    private val natsService: NatsService,
    @Value("\${app.services.messageChannels.subjects.findAllOfUser}") private val findAllOfUsersSubject: String,
    @Value("\${app.services.messageChannels.subjects.findOneOfUser}") private val findOneOfUserSubject: String
) {
    fun findAllChannelsOfUser(requestId: String, userId: String): Flux<MessageChannel> {
        // Request message channels from the messaging service
        val request = RequestResponseFactory.newRequest(requestId)
            .setGetUserMessageChannelsRequest(
                GetUserMessageChannelsRequest.newBuilder()
                    .setUserId(userId)
            )
            .build()

        val response = natsService.requestWithReply(findAllOfUsersSubject, request)

        // Handle the response
        if (!response.hasGetUserMessageChannelsResponse()) {
            throw Exception("Invalid response")
        }

        val getUserMessageChannelsResponse = response.getUserMessageChannelsResponse

        return Flux.fromIterable(getUserMessageChannelsResponse.messageChannelsList)
            .map { messageChannel ->
                // TODO: Get the employer from the employer service
                MessageChannel(
                    messageChannel.id,
                    Employer("<TODO>", "<TODO>", "<TODO>", "<TODO>", "<TODO>"),
                    messageChannel.lastMessage
                )
            }
    }

    fun findOneChannelOfUser(requestId: String, userId: String, channelId: String): Mono<MessageChannel> {
        // Request message channel from the messaging service
        val request = RequestResponseFactory.newRequest(requestId)
            .setGetUserMessageChannelByIdRequest(
                Messaging.GetUserMessageChannelByIdRequest.newBuilder()
                    .setUserId(userId)
                    .setMessageChannelId(channelId)
            )
            .build()

        val response = natsService.requestWithReply(findOneOfUserSubject, request)

        // Handle the response
        if (!response.hasGetUserMessageChannelByIdResponse()) {
            throw Exception("Invalid response")
        }

        val getUserMessageChannelByIdResponse = response.getUserMessageChannelByIdResponse
        // TODO: Get the employer from the employer service
        return Mono.just(
            MessageChannel(
                getUserMessageChannelByIdResponse.messageChannel.id,
                Employer("<TODO>", "<TODO>", "<TODO>", "<TODO>", "<TODO>"),
                getUserMessageChannelByIdResponse.messageChannel.lastMessage
            )
        )
    }
}
