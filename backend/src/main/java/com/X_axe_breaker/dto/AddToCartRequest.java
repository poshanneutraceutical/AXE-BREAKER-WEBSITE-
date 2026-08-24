package com.X_axe_breaker.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddToCartRequest {

    @NotBlank(message = "Customer ID is required")
    private String customerId;

    @NotNull(message = "Product ID is required")
    private Long productId;

    /*
     * Selected ProductFlavour / variant.
     *
     * This is optional because normal products
     * such as Pre-Workout and EAA do not need
     * a flavour variant.
     */
    private Long flavourId;

    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity must be at least 1")
    private Integer quantity;
}