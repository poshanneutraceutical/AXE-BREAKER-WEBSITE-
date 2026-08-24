package com.X_axe_breaker.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "cart_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    /*
     * ============================================================
     * PARENT CART
     * ============================================================
     */

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cart_id", nullable = false)
    private Cart cart;


    /*
     * ============================================================
     * PRODUCT
     * ============================================================
     *
     * Parent product.
     *
     * Example:
     * Protein Matrix-ISO
     */

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;


    /*
     * ============================================================
     * PRODUCT FLAVOUR / VARIANT
     * ============================================================
     *
     * Optional.
     *
     * Normal products:
     *     flavour = null
     *
     * Protein variant:
     *     flavour = selected ProductFlavour
     *
     * This allows different variants of the same product
     * to exist as separate cart items.
     */

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "flavour_id")
    private ProductFlavour flavour;


    /*
     * ============================================================
     * QUANTITY
     * ============================================================
     */

    @Column(nullable = false)
    private Integer quantity;


    /*
     * ============================================================
     * SUBTOTAL
     * ============================================================
     *
     * quantity × selected variant price
     *
     * OR
     *
     * quantity × parent product price
     */

    @Column(nullable = false)
    private BigDecimal subtotal;

}