package com.X_axe_breaker.controller;

import com.X_axe_breaker.dto.LabReportDTO;
import com.X_axe_breaker.entity.LabReport;
import com.X_axe_breaker.service.LabReportService;
import lombok.RequiredArgsConstructor;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
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
            mediaType = MediaType.parseMediaType(
                    report.getContentType()
            );
        } catch (Exception e) {
            mediaType = MediaType.APPLICATION_PDF;
        }

        return ResponseEntity.ok()
                .contentType(mediaType)
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        ContentDisposition
                                .inline()
                                .filename(report.getFileName())
                                .build()
                                .toString()
                )
                .contentLength(
                        report.getFileData().length
                )
                .body(resource);
    }

    /*
     * ADMIN
     *
     * Upload a new lab report.
     */
    @PostMapping(
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<LabReportDTO> uploadReport(
            @RequestParam("title")
            String title,

            @RequestParam(value = "productName", required = false)
            String productName,

            @RequestParam(value = "reportDate", required = false)
            String reportDate,

            @RequestParam("file")
            MultipartFile file
    ) throws Exception {

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
     * ADMIN
     *
     * Delete a report.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReport(
            @PathVariable Long id
    ) {

        labReportService.deleteReport(id);

        return ResponseEntity.noContent().build();
    }
}