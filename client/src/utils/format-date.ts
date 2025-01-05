import dayjs from "dayjs";

export const formatDate = (date: Date): string => {
  const now = dayjs();
  const inputDate = dayjs(date);
  const diffMonths = now.diff(inputDate, "month");
  const diffDays = now.diff(inputDate, "day");
  const diffHours = now.diff(inputDate, "hour");
  const diffMinutes = now.diff(inputDate, "minute");

  if (diffMonths >= 6) {
    // Over 6 months old: "Month Day, Year"
    return inputDate.format("MMM D, YYYY");
  } else if (diffDays >= 1) {
    // Under 6 months, over 1 day old: "Month Day"
    return inputDate.format("MMM D");
  } else if (diffHours >= 1) {
    // Under 1 day, over 1 hour old: "Month Day (X hours old)"
    return `${inputDate.format("MMM D")} (${diffHours} hours old)`;
  } else {
    // Under 1 hour old: "Month Day (X minutes old)"
    return `${inputDate.format("MMM D")} (${diffMinutes} minutes old)`;
  }
};
