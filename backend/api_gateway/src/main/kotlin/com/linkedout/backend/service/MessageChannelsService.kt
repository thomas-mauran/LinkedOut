package com.linkedout.backend.service

import com.linkedout.backend.model.Employer
import com.linkedout.backend.model.MessageChannel
import com.linkedout.common.service.NatsService
import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.proto.services.Messaging
import com.linkedout.proto.services.Messaging.GetUserMessageChannelsRequest
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service

@Service
class MessageChannelsService(
    private val natsService: NatsService,
    private val employerService: EmployerService,
    @Value("\${app.services.messageChannels.subjects.findAllOfUser}") private val findAllOfUsersSubject: String,
    @Value("\${app.services.messageChannels.subjects.findOneOfUser}") private val findOneOfUserSubject: String
) {
    fun findAllChannelsOfUser(requestId: String, userId: String): List<MessageChannel> {
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

        // Get the employers from the employer service
        val employers = employerService.findMultiple(requestId, getUserMessageChannelsResponse.messageChannelsList.map { it.employerId })
        val employersById = employers.associateBy { it.id }

        return getUserMessageChannelsResponse.messageChannelsList.map { messageChannel ->
            MessageChannel(
                messageChannel.id,
                employersById.getOrDefault(messageChannel.employerId, Employer("", "", "", "", "")),
                messageChannel.lastMessage
            )
        }
    }

    fun findOneChannelOfUser(requestId: String, userId: String, channelId: String): MessageChannel {
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

        // Get the employer from the employer service
        val employer = employerService.findOne(requestId, getUserMessageChannelByIdResponse.messageChannel.employerId)

        return MessageChannel(
            getUserMessageChannelByIdResponse.messageChannel.id,
            employer,
            getUserMessageChannelByIdResponse.messageChannel.lastMessage
        )
    }
}
