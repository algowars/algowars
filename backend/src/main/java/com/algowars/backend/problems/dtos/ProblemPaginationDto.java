package com.algowars.backend.problems.dtos;

import com.algowars.backend.common.pagination.dtos.PaginationDto;
import com.algowars.backend.data.models.FeedType;
import jakarta.validation.constraints.NotNull;

public class ProblemPaginationDto extends PaginationDto {
    @NotNull(message = "A feed type is required")
    FeedType feedType;

    public FeedType getFeedType() {
        return feedType;
    }

    public void setFeedType(FeedType feedType) {
        this.feedType = feedType;
    }
}
