package com.X_axe_breaker.repository;

import com.X_axe_breaker.entity.ContactMessage;
import com.X_axe_breaker.entity.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
}