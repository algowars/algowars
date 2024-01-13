package com.algowars.backend.problems.web;

import com.algowars.backend.common.pagination.dtos.PaginationDto;
import com.algowars.backend.common.pagination.dtos.PaginationResponse;
import com.algowars.backend.problems.Problem;
import com.algowars.backend.problems.ProblemService;
import com.algowars.backend.problems.dtos.ProblemPaginationDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/messages")
public class ProblemController {
    private final ProblemService problemService;

    @GetMapping()
    Page<Problem> getAllPageable(@Validated @RequestParam ProblemPaginationDto paginationDto) {
        return problemService.findAllPageable(paginationDto);
    }

}