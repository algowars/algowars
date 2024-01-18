package com.algowars.backend.evaluator.web;

import com.algowars.backend.evaluator.EvaluatorService;
import com.algowars.backend.evaluator.dtos.EvaluationDto;
import com.algowars.backend.evaluator.dtos.EvaluationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/evaluator")
public class EvaluatorController {
    private final EvaluatorService evaluatorService;

    @PostMapping("/execute/anonymous")
    EvaluationResponse executeAnonymous(@Validated @RequestBody EvaluationDto evaluationDto) {
        return evaluatorService.execute(evaluationDto.getCode(), "");
    }
}
