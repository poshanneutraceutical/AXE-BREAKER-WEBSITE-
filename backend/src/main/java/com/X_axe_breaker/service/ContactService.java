package com.X_axe_breaker.service;

import com.X_axe_breaker.dto.ContactMessageDTO;
import com.X_axe_breaker.entity.ContactMessage;
import com.X_axe_breaker.repository.ContactMessageRepository;
import com.X_axe_breaker.repository.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ContactService {

    private final ContactMessageRepository repository;
    private final com.X_axe_breaker.service.EmailService emailService;

    public ContactMessageDTO submitMessage(ContactMessageDTO dto) {

        // Convert DTO to Entity
        ContactMessage msg = ContactMessage.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .subject(dto.getSubject())
                .message(dto.getMessage())
                .build();

        // Save to MySQL
        ContactMessage saved = repository.save(msg);

        // Send email to company
        emailService.sendContactEmail(
                dto.getName(),
                dto.getEmail(),
                dto.getSubject(),
                dto.getMessage()
        );

        // Return saved data
        return toDTO(saved);
    }

    private ContactMessageDTO toDTO(ContactMessage entity) {
        return ContactMessageDTO.builder()
                .name(entity.getName())
                .email(entity.getEmail())
                .subject(entity.getSubject())
                .message(entity.getMessage())
                .build();
    }
}