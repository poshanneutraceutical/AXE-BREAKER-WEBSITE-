package com.X_axe_breaker.service;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

@Service
public class AdminAuthService {

    public static final String SESSION_ATTRIBUTE =
            "AXE_BREAKER_ADMIN_AUTHENTICATED";

    private final String adminUsername;
    private final String adminPassword;

    public AdminAuthService(
            @Value("${axe.admin.username}") String adminUsername,
            @Value("${axe.admin.password}") String adminPassword
    ) {
        this.adminUsername = adminUsername;
        this.adminPassword = adminPassword;
    }

    public boolean login(
            String username,
            String password,
            HttpSession session
    ) {

        if (username == null || password == null) {
            return false;
        }

        boolean usernameMatches = secureEquals(
                adminUsername,
                username
        );

        boolean passwordMatches = secureEquals(
                adminPassword,
                password
        );

        if (!usernameMatches || !passwordMatches) {
            return false;
        }

        session.setAttribute(
                SESSION_ATTRIBUTE,
                Boolean.TRUE
        );

        // 8 hours
        session.setMaxInactiveInterval(8 * 60 * 60);

        return true;
    }

    public boolean isAuthenticated(
            HttpSession session
    ) {

        return Boolean.TRUE.equals(
                session.getAttribute(
                        SESSION_ATTRIBUTE
                )
        );
    }

    public void logout(
            HttpSession session
    ) {

        session.invalidate();
    }

    private boolean secureEquals(
            String expected,
            String actual
    ) {

        return MessageDigest.isEqual(
                expected.getBytes(StandardCharsets.UTF_8),
                actual.getBytes(StandardCharsets.UTF_8)
        );
    }
}