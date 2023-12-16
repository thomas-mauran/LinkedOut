package com.linkedout.profile

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication(scanBasePackages = ["com.linkedout"])
class ProfileApplication

fun main(args: Array<String>) {
    runApplication<ProfileApplication>(*args)
}
