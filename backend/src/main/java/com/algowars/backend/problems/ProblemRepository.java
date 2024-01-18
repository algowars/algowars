package com.algowars.backend.problems;

import com.algowars.backend.data.entities.Problem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;

public interface ProblemRepository extends JpaRepository<Problem, Long> {

    @Query("SELECT p FROM Problem p WHERE p.createdAt <= :timestamp ORDER BY p.createdAt DESC")
    Page<Problem> findAllBeforeTimestamp(Pageable page, LocalDateTime timestamp);
}
