package com.linkedout.notification.function.notifications

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.notification.converter.notifications.NotificationToProto
import com.linkedout.notification.service.NotificationService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Notification.GetUserNotificationsResponse
import org.springframework.stereotype.Component
import java.util.*
import java.util.function.Function

@Component
class GetNotificationsOfUser(private val notificationService: NotificationService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Extract the request
        val request = t.getUserNotificationsRequest
        val userId = UUID.fromString(request.userId)

        // Get the notifications from the database
        val reactiveResponse = notificationService.findBySeasonWorkerId(userId)
            .map { notification ->
                NotificationToProto().convert(notification)
            }
            .reduce(GetUserNotificationsResponse.newBuilder()) { builder, notification ->
                builder.addNotifications(notification)
                builder
            }
            .map { builder ->
                builder.build()
            }

        // Block until the response is ready
        val response = reactiveResponse.block()
            ?: return RequestResponseFactory.newSuccessfulResponse()
                .setGetUserNotificationsResponse(GetUserNotificationsResponse.getDefaultInstance())
                .build()

        return RequestResponseFactory.newSuccessfulResponse()
            .setGetUserNotificationsResponse(response)
            .build()
    }
}
