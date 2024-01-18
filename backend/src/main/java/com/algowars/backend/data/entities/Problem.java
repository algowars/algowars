package com.algowars.backend.problems;

import com.algowars.backend.categories.Category;
import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Problem {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(nullable = false, length = 765)
    private String body;

    @ManyToMany( fetch = FetchType.LAZY)
    private List<Category> categories;

    @Column(columnDefinition = "integer default 0")
    private int likes;

    @Column(columnDefinition = "integer default 0")
    private int dislikes;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}
