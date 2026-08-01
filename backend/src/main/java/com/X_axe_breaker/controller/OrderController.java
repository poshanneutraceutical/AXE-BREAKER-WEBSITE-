package com.X_axe_breaker.controller;

import com.X_axe_breaker.dto.CheckoutRequestDTO;
import com.X_axe_breaker.dto.OrderDTO;
import com.X_axe_breaker.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderService orderService;

    /**
     * Checkout and Place Order
     */
    @PostMapping("/checkout")
    public OrderDTO checkout(
            @Valid @RequestBody CheckoutRequestDTO request) {

        return orderService.checkout(request);
    }

}