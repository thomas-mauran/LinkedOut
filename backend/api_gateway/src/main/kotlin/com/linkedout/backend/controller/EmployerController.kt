package com.linkedout.backend.controller

import com.linkedout.backend.dto.messaging.SendMessageDto
import com.linkedout.backend.model.Employer
import com.linkedout.backend.model.Message
import com.linkedout.backend.model.MessageChannel
import com.linkedout.backend.service.EmployerService
import com.linkedout.backend.service.MessageChannelService
import com.linkedout.backend.service.MessageService
import org.springframework.http.server.reactive.ServerHttpRequest
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Mono
import java.security.Principal

@RestController
@RequestMapping("/api/v1/employers")
class EmployerController(
    private val employerService: EmployerService,
    private val messageChannelService: MessageChannelService,
    private val messageService: MessageService
) {
    @GetMapping("/{employerId}")
    open fun getEmployerById(request: ServerHttpRequest, @PathVariable employerId: String): Mono<Employer> {
        return Mono.just(employerService.findOne(request.id, employerId))
    }

    @GetMapping("/{employerId}/messaging")
    open fun getEmployerMessaging(
        request: ServerHttpRequest,
        principal: Principal,
        @PathVariable employerId: String
    ): Mono<MessageChannel> {
        return Mono.just(messageChannelService.findOneChannelOfUserWithEmployer(request.id, principal.name, employerId))
    }

    @PostMapping("/{employerId}/messaging")
    open fun sendMessage(
        request: ServerHttpRequest,
        principal: Principal,
        @PathVariable employerId: String,
        @RequestBody body: SendMessageDto
    ): Mono<Message> {
        return Mono.just(messageService.sendMessageToEmployer(request.id, principal.name, employerId, body.content))
    }
}
