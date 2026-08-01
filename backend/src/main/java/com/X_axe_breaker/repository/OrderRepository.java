package com.X_axe_breaker.repository;

import com.X_axe_breaker.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByEmail(String email);

}