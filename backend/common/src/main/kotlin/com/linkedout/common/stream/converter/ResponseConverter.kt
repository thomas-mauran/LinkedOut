package com.linkedout.common.stream.converter

import com.linkedout.proto.ResponseOuterClass
import org.springframework.messaging.MessageHeaders
import org.springframework.messaging.converter.AbstractMessageConverter
import org.springframework.util.MimeType

class ResponseConverter : AbstractMessageConverter(MimeType("application", "vnd.linkedout.proto-response")) {
    override fun supports(clazz: Class<*>): Boolean {
        return ResponseOuterClass.Response::class.java == clazz
    }

    override fun convertToInternal(payload: Any, headers: MessageHeaders?, conversionHint: Any?): Any? {
        return (payload as ResponseOuterClass.Response).toByteArray()
    }
}
