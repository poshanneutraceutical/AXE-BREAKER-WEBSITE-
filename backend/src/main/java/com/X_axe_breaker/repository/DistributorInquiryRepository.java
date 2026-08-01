package com.X_axe_breaker.repository;

import com.X_axe_breaker.entity.DistributorInquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DistributorInquiryRepository extends JpaRepository<DistributorInquiry, Long> {
}