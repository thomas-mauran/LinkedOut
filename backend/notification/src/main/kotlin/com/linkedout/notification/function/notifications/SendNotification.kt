package com.linkedout.notification.function.notifications

import com.linkedout.notification.service.NotificationService
import com.linkedout.proto.RequestOuterClass.Request
import org.springframework.stereotype.Component
import java.util.UUID
import java.util.function.Function

@Component
class SendNotification(private val notificationService: NotificationService) : Function<Request, Unit> {
    override fun apply(t: Request) {
        // Extract the request
        val request = t.sendNotificationToRequest
        val userId = UUID.fromString(request.userId)

        // Insert the notification into the database
        val reactiveResponse = notificationService.saveNotification(userId, request.title, request.content)
        reactiveResponse.block()
    }
}
