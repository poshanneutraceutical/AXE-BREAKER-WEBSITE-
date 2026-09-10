package com.X_axe_breaker.controller;

import com.X_axe_breaker.dto.LabReportDTO;
import com.X_axe_breaker.entity.LabReport;
import com.X_axe_breaker.service.AdminAuthService;
import com.X_axe_breaker.service.LabReportService;

import jakarta.servlet.http.HttpSession;

import lombok.RequiredArgsConstructor;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/lab-reports")
@RequiredArgsConstructor
public class LabReportController {

    private final LabReportService labReportService;

    private final AdminAuthService adminAuthService;

    /*
     * PUBLIC
     *
     * Used by the website to display
     * available lab reports.
     */
    @GetMapping
    public ResponseEntity<List<LabReportDTO>> getReports() {

        return ResponseEntity.ok(
                labReportService.getAllReports()
        );
    }

    /*
     * PUBLIC
     *
     * Opens the actual PDF.
     */
    @GetMapping("/{id}/file")
    public ResponseEntity<ByteArrayResource> getReportFile(
            @PathVariable Long id
    ) {

        LabReport report =
                labReportService.getReportFile(id);

        ByteArrayResource resource =
                new ByteArrayResource(
                        report.getFileData()
                );

        MediaType mediaType;

        try {

            mediaType =
                    MediaType.parseMediaType(
                            report.getContentType()
                    );

        } catch (Exception e) {

            mediaType =
                    MediaType.APPLICATION_PDF;
        }

        return ResponseEntity.ok()
                .contentType(mediaType)
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        ContentDisposition
                                .inline()
                                .filename(
                                        report.getFileName()
                                )
                                .build()
                                .toString()
                )
                .contentLength(
                        report.getFileData().length
                )
                .body(resource);
    }

    /*
     * ADMIN ONLY
     *
     * Upload a new lab report.
     */
    @PostMapping(
            consumes =
                    MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<?> uploadReport(
            @RequestParam("title")
            String title,

            @RequestParam(
                    value = "productName",
                    required = false
            )
            String productName,

            @RequestParam(
                    value = "reportDate",
                    required = false
            )
            String reportDate,

            @RequestParam("file")
            MultipartFile file,

            HttpSession session
    ) throws Exception {

        if (!adminAuthService.isAuthenticated(session)) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(
                            "Admin login required."
                    );
        }

        return ResponseEntity.ok(
                labReportService.uploadReport(
                        title,
                        productName,
                        reportDate,
                        file
                )
        );
    }

    /*
     * ADMIN ONLY
     *
     * Delete a report.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReport(
            @PathVariable Long id,
            HttpSession session
    ) {

        if (!adminAuthService.isAuthenticated(session)) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(
                            "Admin login required."
                    );
        }

        labReportService.deleteReport(id);

        return ResponseEntity.noContent().build();
    }
}