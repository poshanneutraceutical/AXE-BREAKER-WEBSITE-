package com.X_axe_breaker.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItemDTO {

    /*
     * Parent product ID
     */
    private Long productId;


    /*
     * Parent product name
     */
    private String productName;


    /*
     * Selected flavour / variant ID
     *
     * NULL for normal products.
     */
    private Long flavourId;


    /*
     * Selected flavour name
     *
     * Example:
     * Mango
     * Chocolate
     * Coffee
     */
    private String flavourName;


    /*
     * Selected product weight
     *
     * Example:
     * 1 KG
     * 2 KG
     */
    private String weight;


    /*
     * Exact price of the selected variant.
     *
     * For normal products:
     *     Product.price
     *
     * For Protein Matrix-ISO:
     *     ProductFlavour.price
     */
    private BigDecimal price;


    /*
     * Quantity
     */
    private Integer quantity;


    /*
     * price × quantity
     */
    private BigDecimal subtotal;
}