package com.X_axe_breaker.repository;

import com.X_axe_breaker.entity.ProductFlavour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductFlavourRepository
        extends JpaRepository<ProductFlavour, Long> {

    List<ProductFlavour> findByProductId(Long productId);
}