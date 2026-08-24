package com.X_axe_breaker.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "product_flavours")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductFlavour {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /*
     * Parent product.
     *
     * Example:
     * Protein Matrix-150
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    /*
     * Flavour name.
     *
     * Examples:
     * Mango
     * Coffee
     * Chocolate
     */
    @Column(name = "flavour_name", nullable = false)
    private String flavourName;

    /*
     * Weight of this particular variant.
     *
     * Examples:
     * 1 KG
     * 2 KG
     */
    @Column(name = "weight")
    private String weight;

    /*
     * Price for this exact weight + flavour combination.
     */
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    /*
     * Description for this exact variant.
     */
    @Column(columnDefinition = "TEXT")
    private String description;

    /*
     * Multiple images for this exact
     * weight + flavour combination.
     *
     * Example:
     *
     * 1 KG Mango
     * [
     *   /products/protein/25.png,
     *   /products/protein/26.png,
     *   /products/protein/27.png
     * ]
     */
    @ElementCollection
    @CollectionTable(
            name = "product_flavour_images",
            joinColumns = @JoinColumn(name = "flavour_id")
    )
    @Column(name = "image_url")
    @OrderColumn(name = "image_order")
    @Builder.Default
    private List<String> images = new ArrayList<>();

    /*
     * Availability of this exact variant.
     */
    @Column(name = "in_stock")
    @Builder.Default
    private Boolean inStock = true;
}