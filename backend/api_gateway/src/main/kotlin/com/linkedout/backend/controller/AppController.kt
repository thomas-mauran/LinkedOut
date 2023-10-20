package com.linkedout.backend.controller

import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.authentication.AbstractAuthenticationToken
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.*

@RestController
@RequestMapping("/api/v1")
open class AppController {
    @GetMapping
    open fun root(test: AbstractAuthenticationToken): AbstractAuthenticationToken {
        return test
    }

    @GetMapping("authed")
    open fun authed(): Date {
        return Date()
    }

    @GetMapping("candidate")
    @PreAuthorize("hasRole('client_candidate')")
    open fun candidate(): String {
        return "Hello premium user"
    }

    @GetMapping("admin")
    @PreAuthorize("hasRole('client_admin')")
    open fun helloProtectedAdmin(): String {
        return "Hello admin user"
    }
}
