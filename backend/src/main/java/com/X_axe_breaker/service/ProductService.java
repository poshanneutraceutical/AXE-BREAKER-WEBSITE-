package com.X_axe_breaker.service;

import com.X_axe_breaker.dto.ProductDTO;
import com.X_axe_breaker.dto.ProductFlavourDTO;
import com.X_axe_breaker.entity.Product;
import com.X_axe_breaker.entity.ProductFlavour;
import com.X_axe_breaker.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;


    /*
     * Get all products.
     */
    public List<ProductDTO> getAllProducts() {

        return productRepository.findAllOrdered()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }


    /*
     * Get a single product by ID.
     */
    public ProductDTO getProductById(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Product not found: " + id
                        ));

        return toDTO(product);
    }


    /*
     * Create product.
     */
    public ProductDTO createProduct(ProductDTO dto) {

        Product product = toEntity(dto);

        Product saved = productRepository.save(product);

        return toDTO(saved);
    }


    /*
     * Update product.
     */
    public ProductDTO updateProduct(
            Long id,
            ProductDTO dto) {

        Product existing = productRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Product not found: " + id
                        ));

        existing.setName(dto.getName());

        existing.setPrice(dto.getPrice());

        existing.setDescription(
                dto.getDescription()
        );

        existing.setCategory(
                dto.getCategory()
        );

        existing.setBadge(
                dto.getBadge()
        );

        existing.setFeatured(
                dto.getFeatured()
        );

        existing.setInStock(
                dto.getInStock()
        );

        return toDTO(
                productRepository.save(existing)
        );
    }


    /*
     * Delete product.
     */
    public void deleteProduct(Long id) {

        productRepository.deleteById(id);
    }


    /*
     * Convert Product Entity -> Product DTO.
     *
     * Important:
     *
     * Every flavour now contains:
     *
     * - flavourName
     * - weight
     * - price
     * - description
     * - images[]
     * - inStock
     */
    private ProductDTO toDTO(Product product) {

        List<ProductFlavourDTO> flavours =
                product.getFlavours()
                        .stream()
                        .map(this::toFlavourDTO)
                        .collect(Collectors.toList());


        return ProductDTO.builder()

                .id(product.getId())

                .name(product.getName())

                .price(product.getPrice())

                .description(
                        product.getDescription()
                )

                .category(
                        product.getCategory()
                )

                .badge(
                        product.getBadge()
                )

                .featured(
                        product.getFeatured()
                )

                .inStock(
                        product.getInStock()
                )

                .flavours(
                        flavours
                )

                .build();
    }


    /*
     * Convert ProductFlavour Entity -> DTO.
     */
    private ProductFlavourDTO toFlavourDTO(
            ProductFlavour flavour) {

        return ProductFlavourDTO.builder()

                .id(
                        flavour.getId()
                )

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
                                ? List.copyOf(
                                flavour.getImages()
                        )
                                : List.of()
                )

                .inStock(
                        flavour.getInStock()
                )

                .build();
    }


    /*
     * Convert Product DTO -> Entity.
     *
     * Flavours are managed through
     * ProductFlavourService, so this method
     * only creates the parent product.
     */
    private Product toEntity(ProductDTO dto) {

        return Product.builder()

                .name(
                        dto.getName()
                )

                .price(
                        dto.getPrice()
                )

                .description(
                        dto.getDescription()
                )

                .category(
                        dto.getCategory()
                )

                .badge(
                        dto.getBadge()
                )

                .featured(
                        dto.getFeatured() != null
                                ? dto.getFeatured()
                                : false
                )

                .inStock(
                        dto.getInStock() != null
                                ? dto.getInStock()
                                : true
                )

                .build();
    }
}