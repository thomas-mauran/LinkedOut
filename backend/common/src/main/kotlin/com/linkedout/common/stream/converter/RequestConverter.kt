package com.linkedout.common.stream.converter

import com.linkedout.proto.RequestOuterClass
import org.springframework.messaging.Message
import org.springframework.messaging.converter.AbstractMessageConverter
import org.springframework.util.MimeType

class RequestConverter : AbstractMessageConverter(MimeType("application", "vnd.linkedout.proto-request")) {
    override fun supports(clazz: Class<*>): Boolean {
        return RequestOuterClass.Request::class.java == clazz
    }

    override fun convertFromInternal(message: Message<*>, targetClass: Class<*>, conversionHint: Any?): Any? {
        val payload = message.payload
        return payload as? RequestOuterClass.Request ?: RequestOuterClass.Request.parseFrom(payload as ByteArray)
    }
}
