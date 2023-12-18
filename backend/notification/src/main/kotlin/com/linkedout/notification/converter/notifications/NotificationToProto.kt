package com.linkedout.notification.converter.notifications

import com.linkedout.notification.model.Notification
import com.linkedout.proto.models.NotificationOuterClass
import org.springframework.core.convert.converter.Converter
import java.time.ZoneOffset

class NotificationToProto : Converter<Notification, NotificationOuterClass.Notification> {
    override fun convert(source: Notification): NotificationOuterClass.Notification {
        return NotificationOuterClass.Notification.newBuilder()
            .setId(source.id.toString())
            .setCreatedAt(source.created.toEpochSecond(ZoneOffset.UTC) * 1000)
            .setTitle(source.title)
            .setContent(source.content)
            .build()
    }
}
