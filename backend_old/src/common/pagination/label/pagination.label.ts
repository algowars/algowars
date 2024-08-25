// Define an enumeration for pagination validation messages
export enum PaginationLabel {
  PAGE_MUST_BE_INT = 'The page must be an integer', // Message for invalid page type
  PAGE_MUST_MEET_MINIMUM = 'The page must be at least 1', // Message for page below minimum
  SIZE_MUST_BE_INT = 'The size must be an integer', // Message for invalid size type
  SIZE_MUST_MEET_MINIMUM = 'The size must be at least 10', // Message for size below minimum
  SIZE_MUST_MEET_MAXIMUM = 'The size must be at most 100', // Message for size exceeding maximum
  TIMESTAMP_MUST_BE_DATE = 'The timestamp must be a date', // Message for invalid timestamp type
  TIMESTAMP_MUST_BE_BEFORE_NOW = 'The timestamp must be before now', // Message for timestamp not being in the past
}
