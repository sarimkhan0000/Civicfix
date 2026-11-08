package com.civicfix.controller;

import com.civicfix.dto.ComplaintDTOs.*;
import com.civicfix.service.ComplaintService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/complaints")
public class ComplaintController {

    private final ComplaintService complaintService;

    public ComplaintController(ComplaintService complaintService) {
        this.complaintService = complaintService;
    }

    @PostMapping
    public ResponseEntity<ComplaintResponse> reportIssue(
            @Valid @RequestBody CreateComplaintRequest request,
            Authentication authentication) {
        ComplaintResponse response = complaintService.createComplaint(request, authentication.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/my")
    public ResponseEntity<Page<ComplaintResponse>> getMyComplaints(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Authentication authentication) {
        return ResponseEntity.ok(complaintService.getMyComplaints(authentication.getName(), PageRequest.of(page, size)));
    }

    @GetMapping("/track/{trackingNumber}")
    public ResponseEntity<ComplaintResponse> trackComplaint(@PathVariable String trackingNumber) {
        return ResponseEntity.ok(complaintService.getComplaintByTrackingNumber(trackingNumber));
    }
}
