package com.civicfix.repository;

import com.civicfix.entity.Complaint;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    Optional<Complaint> findByTrackingNumber(String trackingNumber);
    Page<Complaint> findByCitizenIdOrderByCreatedAtDesc(Long citizenId, Pageable pageable);
    Page<Complaint> findByDepartmentIdOrderByCreatedAtDesc(Long departmentId, Pageable pageable);
    List<Complaint> findTop50ByOrderByCreatedAtDesc();
}
