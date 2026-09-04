package com.X_axe_breaker.service;

import com.X_axe_breaker.dto.LabReportDTO;
import com.X_axe_breaker.entity.LabReport;
import com.X_axe_breaker.repository.LabReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LabReportService {

    private final LabReportRepository labReportRepository;

    public LabReportDTO uploadReport(
            String title,
            String productName,
            String reportDate,
            MultipartFile file
    ) throws IOException {

        if (file == null || file.isEmpty()) {
            throw new RuntimeException("Please select a PDF file.");
        }

        if (!"application/pdf".equalsIgnoreCase(file.getContentType())) {
            throw new RuntimeException("Only PDF files are allowed.");
        }

        // 15 MB maximum
        if (file.getSize() > 15 * 1024 * 1024) {
            throw new RuntimeException(
                    "File size must be less than 15 MB."
            );
        }

        LabReport report = LabReport.builder()
                .title(title)
                .productName(productName)
                .reportDate(reportDate)
                .fileName(file.getOriginalFilename())
                .contentType(file.getContentType())
                .fileData(file.getBytes())
                .build();

        LabReport saved =
                labReportRepository.save(report);

        return toDTO(saved);
    }

    public List<LabReportDTO> getAllReports() {

        return labReportRepository
                .findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public LabReport getReportFile(Long id) {

        return labReportRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Lab report not found."
                        )
                );
    }

    public void deleteReport(Long id) {

        if (!labReportRepository.existsById(id)) {
            throw new RuntimeException(
                    "Lab report not found."
            );
        }

        labReportRepository.deleteById(id);
    }

    private LabReportDTO toDTO(LabReport report) {

        return LabReportDTO.builder()
                .id(report.getId())
                .title(report.getTitle())
                .productName(report.getProductName())
                .reportDate(report.getReportDate())
                .fileName(report.getFileName())
                .contentType(report.getContentType())
                .url("/api/lab-reports/" + report.getId() + "/file")
                .build();
    }
}