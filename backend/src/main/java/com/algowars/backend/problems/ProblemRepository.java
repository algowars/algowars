package com.algowars.backend.problems.repository;

import com.algowars.backend.problems.Problem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface ProblemRepository extends JpaRepository<Problem, Long> {

    @Query("SELECT p FROM Problem p WHERE p.createdAt <= :timestamp ORDER BY p.createdAt DESC")
    Page<Problem> findAllBeforeTimestamp(Pageable page, LocalDateTime timestamp);
}
