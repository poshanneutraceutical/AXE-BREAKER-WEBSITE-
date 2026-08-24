package com.X_axe_breaker.controller;

import com.X_axe_breaker.dto.AddToCartRequest;
import com.X_axe_breaker.dto.CartDTO;
import com.X_axe_breaker.service.CartService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CartController {


    private final CartService cartService;


    /*
     * ============================================================
     * ADD TO CART
     * ============================================================
     *
     * Example:
     *
     * {
     *   "customerId": "123",
     *   "productId": 5,
     *   "flavourId": 5,
     *   "quantity": 1
     * }
     */
    @PostMapping("/add")
    public CartDTO addToCart(
            @Valid @RequestBody AddToCartRequest request) {

        return cartService.addToCart(request);
    }


    /*
     * ============================================================
     * GET CART
     * ============================================================
     */
    @GetMapping("/{customerId}")
    public CartDTO getCart(
            @PathVariable String customerId) {

        return cartService.getCart(
                customerId
        );
    }


    /*
     * ============================================================
     * UPDATE QUANTITY
     * ============================================================
     *
     * flavourId is optional.
     *
     * Normal product:
     *
     * ?quantity=2
     *
     * Variant product:
     *
     * ?quantity=2&flavourId=5
     */
    @PutMapping("/{customerId}/{productId}")
    public CartDTO updateQuantity(

            @PathVariable String customerId,

            @PathVariable Long productId,

            @RequestParam Integer quantity,

            @RequestParam(
                    required = false
            )
            Long flavourId) {

        return cartService.updateQuantity(
                customerId,
                productId,
                flavourId,
                quantity
        );
    }


    /*
     * ============================================================
     * REMOVE PRODUCT
     * ============================================================
     */
    @DeleteMapping("/{customerId}/{productId}")
    public CartDTO removeFromCart(

            @PathVariable String customerId,

            @PathVariable Long productId,

            @RequestParam(
                    required = false
            )
            Long flavourId) {

        return cartService.removeFromCart(
                customerId,
                productId,
                flavourId
        );
    }
}