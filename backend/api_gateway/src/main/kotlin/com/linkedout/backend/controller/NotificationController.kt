package com.linkedout.backend.controller

import com.linkedout.backend.model.Notification
import com.linkedout.backend.service.NotificationService
import org.springframework.http.server.reactive.ServerHttpRequest
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux
import java.security.Principal

@RestController
@RequestMapping("/api/v1/notifications")
class NotificationController(
    private val notificationService: NotificationService
) {
    @GetMapping
    open fun getNotificationsOfUser(request: ServerHttpRequest, principal: Principal): Flux<Notification> {
        return Flux.fromIterable(notificationService.findAllOfUser(request.id, principal.name))
    }

    @DeleteMapping
    open fun deleteAllNotificationsOfUser(request: ServerHttpRequest, principal: Principal) {
        notificationService.deleteAllOfUser(request.id, principal.name)
    }
}
