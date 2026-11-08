package com.civicfix.dto;

import com.civicfix.entity.Priority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class ComplaintDTOs {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateComplaintRequest {
        @NotNull(message = "Category ID is required")
        private Long categoryId;

        @NotBlank(message = "Title is required")
        private String title;

        @NotBlank(message = "Description is required")
        private String description;

        @NotNull(message = "Latitude is required")
        private BigDecimal latitude;

        @NotNull(message = "Longitude is required")
        private BigDecimal longitude;

        @NotBlank(message = "Address is required")
        private String addressText;

        private String landmark;
        private Priority priority;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ComplaintResponse {
        private Long id;
        private String trackingNumber;
        private String title;
        private String description;
        private String categoryName;
        private String departmentName;
        private String status;
        private String priority;
        private BigDecimal latitude;
        private BigDecimal longitude;
        private String addressText;
        private String landmark;
        private Integer upvoteCount;
        private LocalDateTime slaDeadline;
        private Boolean isEscalated;
        private LocalDateTime createdAt;
        private String citizenName;
    }
}
