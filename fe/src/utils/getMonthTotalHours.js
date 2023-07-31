import { monthsDays } from "./monthsDaysArray";
import { months } from "./monthsArray";
export function getMonthTotalHours(startDate, endDate) {
  const currentDate = new Date();

  if (startDate >= endDate) {
    const diffInHours = 86400000 / (1000 * 60 * 60);
    return diffInHours;
  }

  const diffInMilliseconds = Math.abs(endDate - startDate);
  const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
  return diffInHours;
}
