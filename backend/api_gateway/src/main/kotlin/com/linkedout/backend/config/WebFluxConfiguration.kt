package com.linkedout.backend.config

import org.springframework.context.annotation.Configuration
import org.springframework.http.codec.ServerCodecConfigurer
import org.springframework.web.reactive.config.WebFluxConfigurer


@Configuration
internal open class WebFluxConfiguration : WebFluxConfigurer {
    override fun configureHttpMessageCodecs(configurer: ServerCodecConfigurer) {
        configurer.defaultCodecs().maxInMemorySize(8 * 1024 * 1024)
    }
}
