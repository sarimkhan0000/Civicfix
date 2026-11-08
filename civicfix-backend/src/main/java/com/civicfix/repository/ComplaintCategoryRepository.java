package com.civicfix.repository;

import com.civicfix.entity.ComplaintCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComplaintCategoryRepository extends JpaRepository<ComplaintCategory, Long> {
    List<ComplaintCategory> findByDepartmentIdAndIsActiveTrue(Long departmentId);
    List<ComplaintCategory> findByIsActiveTrue();
}
