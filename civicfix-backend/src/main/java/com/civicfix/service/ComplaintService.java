package com.civicfix.service;

import com.civicfix.dto.ComplaintDTOs.*;
import com.civicfix.entity.*;
import com.civicfix.repository.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final ComplaintCategoryRepository categoryRepository;
    private final UserRepository userRepository;

    public ComplaintService(ComplaintRepository complaintRepository,
                            ComplaintCategoryRepository categoryRepository,
                            UserRepository userRepository) {
        this.complaintRepository = complaintRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public ComplaintResponse createComplaint(CreateComplaintRequest request, String citizenEmail) {
        User citizen = userRepository.findByEmail(citizenEmail)
                .orElseThrow(() -> new RuntimeException("Citizen not found"));

        ComplaintCategory category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Invalid category selected"));

        Department department = category.getDepartment();

        String trackingNumber = "CF-" + LocalDateTime.now().getYear() + "-" +
                UUID.randomUUID().toString().substring(0, 6).toUpperCase();

        Priority priority = request.getPriority() != null 
                ? request.getPriority() 
                : category.getDefaultPriority();

        LocalDateTime deadline = LocalDateTime.now().plusHours(category.getDefaultSlaHours());

        Complaint complaint = Complaint.builder()
                .trackingNumber(trackingNumber)
                .citizen(citizen)
                .category(category)
                .department(department)
                .title(request.getTitle())
                .description(request.getDescription())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .addressText(request.getAddressText())
                .landmark(request.getLandmark())
                .priority(priority)
                .status(Complaint.Status.SUBMITTED)
                .slaDeadline(deadline)
                .build();

        Complaint saved = complaintRepository.save(complaint);
        return mapToResponse(saved);
    }

    public Page<ComplaintResponse> getMyComplaints(String citizenEmail, Pageable pageable) {
        User citizen = userRepository.findByEmail(citizenEmail)
                .orElseThrow(() -> new RuntimeException("Citizen not found"));
        return complaintRepository.findByCitizenIdOrderByCreatedAtDesc(citizen.getId(), pageable)
                .map(this::mapToResponse);
    }

    public ComplaintResponse getComplaintByTrackingNumber(String trackingNumber) {
        Complaint complaint = complaintRepository.findByTrackingNumber(trackingNumber)
                .orElseThrow(() -> new RuntimeException("Complaint not found with tracking ID: " + trackingNumber));
        return mapToResponse(complaint);
    }

    private ComplaintResponse mapToResponse(Complaint c) {
        return ComplaintResponse.builder()
                .id(c.getId())
                .trackingNumber(c.getTrackingNumber())
                .title(c.getTitle())
                .description(c.getDescription())
                .categoryName(c.getCategory().getName())
                .departmentName(c.getDepartment().getName())
                .status(c.getStatus().name())
                .priority(c.getPriority().name())
                .latitude(c.getLatitude())
                .longitude(c.getLongitude())
                .addressText(c.getAddressText())
                .landmark(c.getLandmark())
                .upvoteCount(c.getUpvoteCount())
                .slaDeadline(c.getSlaDeadline())
                .isEscalated(c.getIsEscalated())
                .createdAt(c.getCreatedAt())
                .citizenName(c.getCitizen().getFirstName() + " " + c.getCitizen().getLastName())
                .build();
    }
}
