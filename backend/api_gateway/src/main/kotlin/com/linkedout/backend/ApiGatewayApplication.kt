package com.linkedout.backend

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication

@SpringBootApplication(scanBasePackages = ["com.linkedout"])
open class ApiGatewayApplication

fun main(args: Array<String>) {
    SpringApplication.run(ApiGatewayApplication::class.java, *args)
}
