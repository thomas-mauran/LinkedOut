package com.linkedout.backend.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class AppController {
    @GetMapping("test")
    public String test() { return "Hello normal test"; }
    @GetMapping()
    public String hello() { return "Hello normal rout"; }


    @GetMapping("/candidate")
    @PreAuthorize("hasRole('client_candidate')")
    public String helloProtected(){ return "Hello premium user"; }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('client_admin')")
    public String helloProtectedAdmin(){ return "Hello admin user"; }
}
