package com.X_axe_breaker.controller;

import com.X_axe_breaker.service.AuthService;
import com.X_axe_breaker.dto.VerifyRequest;
import com.X_axe_breaker.dto.VerifyResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/verify")
    public ResponseEntity<VerifyResponse> verify(@RequestBody VerifyRequest request) {
        return ResponseEntity.ok(authService.checkCode(request));
    }
}