package com.linkedout.notification.function.notifications

import com.linkedout.common.utils.RequestResponseFactory
import com.linkedout.common.utils.handleRequestError
import com.linkedout.notification.service.NotificationService
import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import com.linkedout.proto.services.Notification
import org.springframework.stereotype.Component
import java.util.UUID
import java.util.function.Function

@Component
class DeleteNotificationsOfUser(private val notificationService: NotificationService) : Function<Request, Response> {
    override fun apply(t: Request): Response = handleRequestError {
        // Extract the request
        val request = t.deleteUserNotificationsRequest
        val userId = UUID.fromString(request.userId)

        // Delete the notifications from the database
        notificationService.deleteBySeasonWorkerId(userId).block()

        return RequestResponseFactory.newSuccessfulResponse()
            .setDeleteUserNotificationsResponse(Notification.DeleteUserNotificationsResponse.getDefaultInstance())
            .build()
    }
}
