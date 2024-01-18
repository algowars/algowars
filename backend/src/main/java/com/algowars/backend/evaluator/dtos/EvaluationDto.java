package com.algowars.backend.evaluator.dtos;

import jakarta.validation.constraints.NotNull;

public class EvaluationDto {
    @NotNull(message = "Code is required")
    private String code;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
