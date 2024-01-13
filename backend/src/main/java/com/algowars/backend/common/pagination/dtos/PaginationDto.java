package com.algowars.backend.common.pagination.dtos;

import com.algowars.backend.common.pagination.labels.PaginationLabel;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;

import java.time.LocalDateTime;

public class PaginationDto {
    @NotNull(message = PaginationLabel.PAGE_NOT_NULL)
    @Min(value = 1, message = PaginationLabel.PAGE_NOT_MINIMUM)
    int page;

    @NotNull(message = PaginationLabel.SIZE_NOT_NULL)
    @Min(value = 5, message = PaginationLabel.SIZE_NOT_MINIMUM)
    @Max(value = 100, message = PaginationLabel.SIZE_NOT_MAXIMUM)
    int size;

    @NotNull(message = PaginationLabel.TIMESTAMP_NOT_NULL)
    @Past(message = PaginationLabel.TIMESTAMP_NOT_BEFORE)
    LocalDateTime timestamp;

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
