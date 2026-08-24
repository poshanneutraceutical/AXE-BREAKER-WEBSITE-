package com.X_axe_breaker.service;

import com.X_axe_breaker.dto.ProductFlavourDTO;
import com.X_axe_breaker.entity.Product;
import com.X_axe_breaker.entity.ProductFlavour;
import com.X_axe_breaker.repository.ProductFlavourRepository;
import com.X_axe_breaker.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductFlavourService {

    private final ProductFlavourRepository flavourRepository;
    private final ProductRepository productRepository;


    /*
     * Get all variants belonging to a product.
     */
    @Transactional(readOnly = true)
    public List<ProductFlavourDTO> getFlavours(Long productId) {

        productRepository.findById(productId)
                .orElseThrow(() ->
                        new EntityNotFoundException(
                                "Product not found: " + productId
                        ));

        return flavourRepository.findByProductId(productId)
                .stream()
                .map(this::toDTO)
                .toList();
    }


    /*
     * Create a new weight + flavour combination.
     *
     * Example:
     *
     * Product:
     * Protein Matrix-150
     *
     * Flavour:
     * Mango
     *
     * Weight:
     * 1 KG
     *
     * Images:
     * 25.png
     * 26.png
     * 27.png
     */
    public ProductFlavourDTO createFlavour(
            Long productId,
            ProductFlavourDTO dto) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new EntityNotFoundException(
                                "Product not found: " + productId
                        ));

        ProductFlavour flavour = ProductFlavour.builder()
                .product(product)
                .flavourName(dto.getFlavourName())
                .weight(dto.getWeight())
                .price(dto.getPrice())
                .description(dto.getDescription())
                .images(
                        dto.getImages() != null
                                ? new ArrayList<>(dto.getImages())
                                : new ArrayList<>()
                )
                .inStock(
                        dto.getInStock() != null
                                ? dto.getInStock()
                                : true
                )
                .build();

        ProductFlavour saved =
                flavourRepository.save(flavour);

        return toDTO(saved);
    }


    /*
     * Update an existing weight + flavour combination.
     */
    public ProductFlavourDTO updateFlavour(
            Long productId,
            Long flavourId,
            ProductFlavourDTO dto) {

        ProductFlavour flavour =
                flavourRepository.findById(flavourId)
                        .orElseThrow(() ->
                                new EntityNotFoundException(
                                        "Flavour not found: "
                                                + flavourId
                                ));

        /*
         * Make sure this flavour actually belongs
         * to the requested product.
         */
        if (!flavour.getProduct()
                .getId()
                .equals(productId)) {

            throw new EntityNotFoundException(
                    "Flavour does not belong to this product"
            );
        }


        flavour.setFlavourName(
                dto.getFlavourName()
        );

        flavour.setWeight(
                dto.getWeight()
        );

        flavour.setPrice(
                dto.getPrice()
        );

        flavour.setDescription(
                dto.getDescription()
        );


        /*
         * Replace all images for this variant.
         */
        flavour.setImages(
                dto.getImages() != null
                        ? new ArrayList<>(dto.getImages())
                        : new ArrayList<>()
        );


        if (dto.getInStock() != null) {

            flavour.setInStock(
                    dto.getInStock()
            );

        }


        ProductFlavour updated =
                flavourRepository.save(flavour);

        return toDTO(updated);
    }


    /*
     * Delete a specific weight + flavour combination.
     */
    public void deleteFlavour(
            Long productId,
            Long flavourId) {

        ProductFlavour flavour =
                flavourRepository.findById(flavourId)
                        .orElseThrow(() ->
                                new EntityNotFoundException(
                                        "Flavour not found: "
                                                + flavourId
                                ));


        if (!flavour.getProduct()
                .getId()
                .equals(productId)) {

            throw new EntityNotFoundException(
                    "Flavour does not belong to this product"
            );
        }


        flavourRepository.delete(flavour);
    }


    /*
     * Convert Entity -> DTO.
     */
    private ProductFlavourDTO toDTO(
            ProductFlavour flavour) {

        return ProductFlavourDTO.builder()

                .id(flavour.getId())

                .flavourName(
                        flavour.getFlavourName()
                )

                .weight(
                        flavour.getWeight()
                )

                .price(
                        flavour.getPrice()
                )

                .description(
                        flavour.getDescription()
                )

                .images(
                        flavour.getImages() != null
                                ? new ArrayList<>(
                                flavour.getImages()
                        )
                                : new ArrayList<>()
                )

                .inStock(
                        flavour.getInStock()
                )

                .build();
    }
}