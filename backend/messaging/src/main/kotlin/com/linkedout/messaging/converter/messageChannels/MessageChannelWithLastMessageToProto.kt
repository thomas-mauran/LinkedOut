package com.linkedout.messaging.converter.messageChannels

import com.linkedout.messaging.model.MessageChannelWithLastMessage
import com.linkedout.proto.models.MessageChannelOuterClass
import org.springframework.core.convert.converter.Converter

class MessageChannelWithLastMessageToProto : Converter<MessageChannelWithLastMessage, MessageChannelOuterClass.MessageChannel.Builder> {
    override fun convert(source: MessageChannelWithLastMessage): MessageChannelOuterClass.MessageChannel.Builder {
        return MessageChannelOuterClass.MessageChannel.newBuilder()
            .setId(source.id.toString())
            .setEmployerId(source.employerId.toString())
            .setLastMessage(source.lastMessage ?: "")
    }
}
