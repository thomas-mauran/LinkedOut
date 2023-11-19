package com.linkedout.jobs

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class JobsApplication

fun main(args: Array<String>) {
    runApplication<JobsApplication>(*args)
}
