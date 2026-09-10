package com.X_axe_breaker.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AdminLoginResponse {

    private boolean authenticated;
    private String message;
}