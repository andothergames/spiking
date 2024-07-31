package com.example.demo.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
    @GetMapping("/")
    public String home(){
        return "Hello there";
    }
    @GetMapping("/secured")
    public String secured(@AuthenticationPrincipal OAuth2User user){
        System.out.println("in java home controller");
       return user.toString();
    }
}
