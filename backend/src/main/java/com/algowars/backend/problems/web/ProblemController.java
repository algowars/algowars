package com.algowars.backend.problems.web;

import com.algowars.backend.problems.FindProblems;
import com.algowars.backend.problems.Problem;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.awt.print.Pageable;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/messages")
public class ProblemController {

    private final @NonNull FindProblems findProblems;


    @GetMapping()
    List<Problem> allPageable() {
        return null;
    }

}
