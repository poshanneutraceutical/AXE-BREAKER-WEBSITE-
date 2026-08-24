package com.X_axe_breaker.controller;

import com.X_axe_breaker.dto.ProductFlavourDTO;
import com.X_axe_breaker.service.ProductFlavourService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products/{productId}/flavours")
@RequiredArgsConstructor
public class ProductFlavourController {

    private final ProductFlavourService flavourService;


    @GetMapping
    public ResponseEntity<List<ProductFlavourDTO>> getFlavours(
            @PathVariable Long productId) {

        return ResponseEntity.ok(
                flavourService.getFlavours(productId)
        );
    }


    @PostMapping
    public ResponseEntity<ProductFlavourDTO> createFlavour(
            @PathVariable Long productId,
            @RequestBody ProductFlavourDTO dto) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        flavourService.createFlavour(
                                productId,
                                dto
                        )
                );
    }


    @PutMapping("/{flavourId}")
    public ResponseEntity<ProductFlavourDTO> updateFlavour(
            @PathVariable Long productId,
            @PathVariable Long flavourId,
            @RequestBody ProductFlavourDTO dto) {

        return ResponseEntity.ok(
                flavourService.updateFlavour(
                        productId,
                        flavourId,
                        dto
                )
        );
    }


    @DeleteMapping("/{flavourId}")
    public ResponseEntity<Void> deleteFlavour(
            @PathVariable Long productId,
            @PathVariable Long flavourId) {

        flavourService.deleteFlavour(
                productId,
                flavourId
        );

        return ResponseEntity.noContent().build();
    }
}