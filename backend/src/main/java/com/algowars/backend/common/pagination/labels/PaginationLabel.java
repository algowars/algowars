package com.algowars.backend.common.pagination.labels;

public class PaginationLabel {
    public static final String PAGE_NOT_NULL = "Page must be provided";
    public static final String PAGE_NOT_MINIMUM = "Page must be at least 1";

    public static final String SIZE_NOT_NULL = "Size must be provided";
    public static final String SIZE_NOT_MINIMUM = "Size must be at least 5";
    public static final String SIZE_NOT_MAXIMUM = "Size must be no more than 100";

    public static final String TIMESTAMP_NOT_NULL = "Timestamp must be provided";
    public static final String TIMESTAMP_NOT_BEFORE = "Timestamp must be in the past";
}
