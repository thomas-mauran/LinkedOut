package com.linkedout.backend.service

import com.linkedout.common.service.NatsService
import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.proto.models.NotificationOuterClass
import com.linkedout.proto.services.Notification
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.time.format.DateTimeFormatter
import java.util.*
import com.linkedout.backend.model.Notification as NotificationModel

@Service
class NotificationService(
    private val natsService: NatsService,
    @Value("\${app.services.notifications.subjects.sendTo}") private val sendToSubject: String,
    @Value("\${app.services.notifications.subjects.findAllOfUser}") private val findAllOfUserSubject: String,
    @Value("\${app.services.notifications.subjects.deleteAllOfUser}") private val deleteAllOfUserSubject: String
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

    fun findAllOfUser(requestId: String, userId: String): List<NotificationModel> {
        // Send the request to the notification service
        val request = RequestResponseFactory.newRequest(requestId)
            .setGetUserNotificationsRequest(
                Notification.GetUserNotificationsRequest.newBuilder()
                    .setUserId(userId)
            )
            .build()

        val response = natsService.requestWithReply(findAllOfUserSubject, request)

        // Handle the response
        if (!response.hasGetUserNotificationsResponse()) {
            throw Exception("Invalid response")
        }

        val getUserNotificationsResponse = response.getUserNotificationsResponse

        return getUserNotificationsResponse.notificationsList.map { notification ->
            convertNotificationFromProto(notification)
        }
    }

    fun deleteAllOfUser(requestId: String, userId: String) {
        // Send the request to the notification service
        val request = RequestResponseFactory.newRequest(requestId)
            .setDeleteUserNotificationsRequest(
                Notification.DeleteUserNotificationsRequest.newBuilder()
                    .setUserId(userId)
            )
            .build()

        natsService.requestWithReply(deleteAllOfUserSubject, request)
    }

    private fun convertNotificationFromProto(source: NotificationOuterClass.Notification): NotificationModel {
        val sentAt = Date(source.createdAt)

        return NotificationModel(
            source.id,
            source.title,
            source.content,
            DateTimeFormatter.ISO_INSTANT.format(sentAt.toInstant())
        )
    }
}
