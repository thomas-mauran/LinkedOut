package com.linkedout.backend.controller

import com.linkedout.backend.model.MessageChannel
import com.linkedout.backend.service.MessageChannelsService
import org.springframework.http.server.reactive.ServerHttpRequest
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux
import java.security.Principal

@RestController
@RequestMapping("/api/v1/messaging")
class MessagingController(private val messageChannelsService: MessageChannelsService) {
    @GetMapping
    open fun getMessageChannelsOfUser(request: ServerHttpRequest, principal: Principal): Flux<MessageChannel> {
        return messageChannelsService.findAllChannelsOfUser(request.id, principal.name)
    }
}
