package com.linkedout.backend.service

import com.linkedout.backend.model.Employer
import com.linkedout.backend.model.MessageChannel
import com.linkedout.common.service.NatsService
import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.proto.models.MessageChannelOuterClass
import com.linkedout.proto.services.Messaging
import com.linkedout.proto.services.Messaging.GetUserMessageChannelsRequest
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service

@Service
class MessageChannelService(
    private val natsService: NatsService,
    private val employerService: EmployerService,
    @Value("\${app.services.messageChannels.subjects.findAllOfUser}") private val findAllOfUsersSubject: String,
    @Value("\${app.services.messageChannels.subjects.findOneOfUser}") private val findOneOfUserSubject: String,
    @Value("\${app.services.messageChannels.subjects.findOneOfUserWithEmployer}") private val findOneOfUserWithEmployerSubject: String
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
            convertMessageChannelFromProto(
                messageChannel,
                employersById.getOrDefault(messageChannel.employerId, Employer(messageChannel.employerId, "", "", "", ""))
            )
        }
    }

    fun findOneChannelOfUser(requestId: String, userId: String, channelId: String): MessageChannel {
        // Request message channel from the messaging service
        val request = RequestResponseFactory.newRequest(requestId)
            .setGetUserMessageChannelRequest(
                Messaging.GetUserMessageChannelRequest.newBuilder()
                    .setUserId(userId)
                    .setMessageChannelId(channelId)
            )
            .build()

        val response = natsService.requestWithReply(findOneOfUserSubject, request)

        // Handle the response
        if (!response.hasGetUserMessageChannelResponse()) {
            throw Exception("Invalid response")
        }

        val getUserMessageChannelByIdResponse = response.getUserMessageChannelResponse

        // Get the employer from the employer service
        val employer = employerService.findOne(requestId, getUserMessageChannelByIdResponse.messageChannel.employerId)
        return convertMessageChannelFromProto(getUserMessageChannelByIdResponse.messageChannel, employer)
    }

    fun findOneChannelOfUserWithEmployer(requestId: String, userId: String, employerId: String): MessageChannel {
        // Request message channel from the messaging service
        val request = RequestResponseFactory.newRequest(requestId)
            .setGetUserMessageChannelWithEmployerRequest(
                Messaging.GetUserMessageChannelWithEmployerRequest.newBuilder()
                    .setUserId(userId)
                    .setEmployerId(employerId)
            )
            .build()

        val response = natsService.requestWithReply(findOneOfUserWithEmployerSubject, request)

        // Handle the response
        if (!response.hasGetUserMessageChannelWithEmployerResponse()) {
            throw Exception("Invalid response")
        }

        val getUserMessageChannelByIdResponse = response.getUserMessageChannelWithEmployerResponse

        // Get the employer from the employer service
        val employer = employerService.findOne(requestId, getUserMessageChannelByIdResponse.messageChannel.employerId)
        return convertMessageChannelFromProto(getUserMessageChannelByIdResponse.messageChannel, employer)
    }

    private fun convertMessageChannelFromProto(source: MessageChannelOuterClass.MessageChannel, employer: Employer): MessageChannel {
        return MessageChannel(
            source.id,
            employer,
            source.lastMessage
        )
    }
}
