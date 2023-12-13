package com.linkedout.notification.service

import com.linkedout.notification.model.Notification
import com.linkedout.notification.repository.NotificationRepository
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.UUID

@Service
class NotificationService(
    private val notificationRepository: NotificationRepository
) {
    fun saveNotification(seasonworkerId: UUID, title: String, content: String): Mono<Notification> {
        return notificationRepository.saveNotification(seasonworkerId, title, content)
    }

    fun findBySeasonWorkerId(seasonworkerId: UUID): Flux<Notification> {
        return notificationRepository.findBySeasonWorkerId(seasonworkerId)
    }
}
