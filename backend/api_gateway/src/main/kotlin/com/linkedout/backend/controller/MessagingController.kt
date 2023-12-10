package com.linkedout.backend.controller

import com.linkedout.backend.dto.messaging.SendMessageDto
import com.linkedout.backend.model.Message
import com.linkedout.backend.model.MessageChannel
import com.linkedout.backend.service.MessageChannelService
import com.linkedout.backend.service.MessageService
import org.springframework.http.server.reactive.ServerHttpRequest
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.security.Principal

@RestController
@RequestMapping("/api/v1/messaging")
class MessagingController(
    private val messageChannelService: MessageChannelService,
    private val messageService: MessageService
) {
    @GetMapping
    open fun getMessageChannelsOfUser(request: ServerHttpRequest, principal: Principal): Flux<MessageChannel> {
        return Flux.fromIterable(messageChannelService.findAllChannelsOfUser(request.id, principal.name))
    }

    @GetMapping("/{channelId}")
    open fun getMessageChannelOfUser(
        request: ServerHttpRequest,
        principal: Principal,
        @PathVariable channelId: String
    ): Mono<MessageChannel> {
        return Mono.just(messageChannelService.findOneChannelOfUser(request.id, principal.name, channelId))
    }

    @GetMapping("/{channelId}/messages")
    open fun getMessagesOfUserInChannel(
        request: ServerHttpRequest,
        principal: Principal,
        @PathVariable channelId: String
    ): Flux<Message> {
        return Flux.fromIterable(messageService.findAllMessagesOfUserInChannel(request.id, principal.name, channelId))
    }

    @PostMapping("/{channelId}/messages")
    open fun sendMessage(
        request: ServerHttpRequest,
        principal: Principal,
        @PathVariable channelId: String,
        @RequestBody body: SendMessageDto
    ): Mono<Message> {
        return Mono.just(messageService.sendMessage(request.id, principal.name, channelId, body.content))
    }
}
