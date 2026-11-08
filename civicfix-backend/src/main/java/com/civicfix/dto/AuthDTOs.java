package com.civicfix.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

public class AuthDTOs {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LoginRequest {
        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email format")
        private String email;

        @NotBlank(message = "Password is required")
        private String password;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RegisterRequest {
        @NotBlank(message = "First name is required")
        @Size(min = 2, max = 60)
        private String firstName;

        @NotBlank(message = "Last name is required")
        @Size(min = 2, max = 60)
        private String lastName;

        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email format")
        private String email;

        @NotBlank(message = "Password is required")
        @Size(min = 6, message = "Password must be at least 6 characters")
        private String password;

        private String phoneNumber;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class AuthResponse {
        private String token;
        private String type;
        private Long id;
        private String email;
        private String firstName;
        private String lastName;
        private String role;
        private Long departmentId;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class ApiResponse {
        private boolean success;
        private String message;
    }
}