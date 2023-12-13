package com.linkedout.notification.repository

import com.linkedout.notification.model.Notification
import org.springframework.data.r2dbc.repository.Query
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import reactor.core.publisher.Mono
import java.util.UUID

interface NotificationRepository : ReactiveCrudRepository<Notification, UUID> {
    @Query(
        """
        INSERT INTO notification (seasonworkerid, title, content)
        VALUES (:seasonworkerId, :title, :content)
        RETURNING *
    """
    )
    fun saveNotification(seasonworkerId: UUID, title: String, content: String): Mono<Notification>
}
