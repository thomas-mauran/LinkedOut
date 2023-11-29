package com.linkedout.jobs

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication(scanBasePackages = ["com.linkedout"])
class JobsApplication

fun main(args: Array<String>) {
    runApplication<JobsApplication>(*args)
}
