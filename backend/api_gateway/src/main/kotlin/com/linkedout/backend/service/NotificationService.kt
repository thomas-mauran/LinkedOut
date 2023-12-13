package com.linkedout.backend.service

import com.linkedout.common.service.NatsService
import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.proto.services.Notification
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service

@Service
class NotificationService(
    private val natsService: NatsService,
    @Value("\${app.services.notifications.subjects.sendTo}") private val sendToSubject: String
) {
    fun sendTo(requestId: String, userId: String, title: String, content: String) {
        // Send the notification to the notification service
        val request = RequestResponseFactory.newRequest(requestId)
            .setSendNotificationToRequest(
                Notification.SendNotificationToRequest.newBuilder()
                    .setUserId(userId)
                    .setTitle(title)
                    .setContent(content)
            )
            .build()

        natsService.request(sendToSubject, request)
    }
}
