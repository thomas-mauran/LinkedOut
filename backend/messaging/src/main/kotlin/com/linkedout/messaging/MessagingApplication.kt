package com.linkedout.messaging

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication(scanBasePackages = ["com.linkedout"])
class MessagingApplication

fun main(args: Array<String>) {
    runApplication<MessagingApplication>(*args)
}
