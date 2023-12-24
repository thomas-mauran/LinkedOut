package com.linkedout.messaging.converter.messages

import com.linkedout.messaging.model.Message
import com.linkedout.messaging.utils.MessageDirection
import com.linkedout.proto.models.MessageOuterClass
import org.springframework.core.convert.converter.Converter
import java.time.ZoneOffset

class MessageToProto : Converter<Message, MessageOuterClass.Message.Builder> {
    override fun convert(source: Message): MessageOuterClass.Message.Builder {
        return MessageOuterClass.Message.newBuilder()
            .setId(source.id.toString())
            .setDirection(MessageDirection.toProto(source.direction))
            .setSentAt(source.created.toEpochSecond(ZoneOffset.UTC) * 1000)
            .setContent(source.message)
    }
}
