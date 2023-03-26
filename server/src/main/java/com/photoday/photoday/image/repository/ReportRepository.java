package com.photoday.photoday.image.repository;

import com.photoday.photoday.image.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> { //TODO 인터페이스 삭제하기
    List<Report> findReportByUser_UserId(Long userId);
}
