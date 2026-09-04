package com.X_axe_breaker.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LabReportDTO {

    private Long id;

    private String title;

    private String productName;

    private String reportDate;

    private String fileName;

    private String contentType;

    private String url;
}