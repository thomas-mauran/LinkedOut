package com.linkedout.common.stream.converter

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.messaging.converter.MessageConverter

@Configuration
class ConverterConfiguration {
    @Bean
    fun requestConverter(): MessageConverter {
        return RequestConverter()
    }

    @Bean
    fun responseConverter(): MessageConverter {
        return ResponseConverter()
    }
}
