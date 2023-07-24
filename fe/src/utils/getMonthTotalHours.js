import { monthsDays } from "./monthsDaysArray";
import { months } from "./monthsArray";
export function getMonthTotalHours(startDate, endDate) {
  const currentDate = new Date();

  const diffInMilliseconds = Math.abs(endDate - startDate);
  const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
  return diffInHours;
}
