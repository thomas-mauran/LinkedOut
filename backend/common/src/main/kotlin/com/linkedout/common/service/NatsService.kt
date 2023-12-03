package com.linkedout.common.service

import com.linkedout.proto.RequestOuterClass.Request
import com.linkedout.proto.ResponseOuterClass.Response
import io.nats.client.Connection
import io.nats.client.Nats
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Lazy
import org.springframework.http.HttpStatus
import org.springframework.http.HttpStatusCode
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import java.time.Duration

@Service
@Lazy
class NatsService(@Value("\${nats.spring.server}") private val natsUrl: String, @Value("\${nats.timeout}") private val natsTimeout: Long) {
    val nc: Connection = Nats.connect(natsUrl)
    val timeout: Duration = Duration.ofMillis(natsTimeout)

    fun requestWithReply(subject: String, request: Request): Response {
        val rawResponse = nc.request(subject, request.toByteArray(), timeout)
            ?: throw ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "No response from service")

        val response = Response.parseFrom(rawResponse.data)

        if (response.hasError()) {
            throw ResponseStatusException(HttpStatusCode.valueOf(response.error.errorCode), response.error.errorMessage)
        }

        return response
    }
}
