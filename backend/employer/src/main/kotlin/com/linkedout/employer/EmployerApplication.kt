package com.linkedout.employer

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication(scanBasePackages = ["com.linkedout"])
class EmployerApplication

fun main(args: Array<String>) {
    runApplication<EmployerApplication>(*args)
}
