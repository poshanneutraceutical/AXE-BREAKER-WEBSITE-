package com.X_axe_breaker.dto;

import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductFlavourDTO {

    private Long id;

    private String flavourName;

    /*
     * Product weight.
     *
     * Examples:
     * 1 KG
     * 2 KG
     */
    private String weight;

    private BigDecimal price;

    private String description;

    /*
     * Multiple images belonging to this
     * particular weight + flavour combination.
     */
    @Builder.Default
    private List<String> images = new ArrayList<>();

    private Boolean inStock;
}