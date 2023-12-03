package com.linkedout.backend.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity
import org.springframework.security.config.web.server.ServerHttpSecurity
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter
import org.springframework.security.oauth2.server.resource.authentication.ReactiveJwtAuthenticationConverter
import org.springframework.security.oauth2.server.resource.authentication.ReactiveJwtGrantedAuthoritiesConverterAdapter
import org.springframework.security.web.server.SecurityWebFilterChain
import org.springframework.security.web.server.context.NoOpServerSecurityContextRepository

@Configuration
@EnableWebFluxSecurity
@EnableReactiveMethodSecurity
internal open class SecurityConfig {
    @Bean
    @Throws(Exception::class)
    open fun filterChain(http: ServerHttpSecurity): SecurityWebFilterChain {
        http.oauth2ResourceServer { auth -> auth.jwt { } }
            .securityContextRepository(NoOpServerSecurityContextRepository.getInstance())
            .csrf { csrf -> csrf.disable() }
            .authorizeExchange { auth -> auth.anyExchange().hasRole("client_candidate") }

        return http.build()
    }

    @Bean
    open fun jwtAuthenticationConverter(): ReactiveJwtAuthenticationConverter {
        val jwtGrantedAuthoritiesConverter = JwtGrantedAuthoritiesConverter()
        jwtGrantedAuthoritiesConverter.setAuthoritiesClaimName("platform_roles")
        jwtGrantedAuthoritiesConverter.setAuthorityPrefix("ROLE_")

        val jwtAuthenticationConverter = ReactiveJwtAuthenticationConverter()
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(ReactiveJwtGrantedAuthoritiesConverterAdapter(jwtGrantedAuthoritiesConverter))
        return jwtAuthenticationConverter
    }
}
