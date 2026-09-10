package com.X_axe_breaker.controller;

import com.X_axe_breaker.dto.AdminLoginRequest;
import com.X_axe_breaker.dto.AdminLoginResponse;
import com.X_axe_breaker.service.AdminAuthService;

import jakarta.servlet.http.HttpSession;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminAuthController {

    private final AdminAuthService adminAuthService;

    @PostMapping("/login")
    public ResponseEntity<AdminLoginResponse> login(
            @RequestBody AdminLoginRequest request,
            HttpSession session
    ) {

        boolean success =
                adminAuthService.login(
                        request.getUsername(),
                        request.getPassword(),
                        session
                );

        if (!success) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(
                            new AdminLoginResponse(
                                    false,
                                    "Invalid admin ID or password."
                            )
                    );
        }

        return ResponseEntity.ok(
                new AdminLoginResponse(
                        true,
                        "Admin login successful."
                )
        );
    }

    @GetMapping("/session")
    public ResponseEntity<AdminLoginResponse> session(
            HttpSession session
    ) {

        boolean authenticated =
                adminAuthService.isAuthenticated(
                        session
                );

        if (!authenticated) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(
                            new AdminLoginResponse(
                                    false,
                                    "Admin session not found."
                            )
                    );
        }

        return ResponseEntity.ok(
                new AdminLoginResponse(
                        true,
                        "Admin session is active."
                )
        );
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(
            HttpSession session
    ) {

        adminAuthService.logout(session);

        return ResponseEntity.noContent().build();
    }
}