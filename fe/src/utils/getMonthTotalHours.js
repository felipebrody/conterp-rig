import { monthsDays } from "./monthsDaysArray";
import { months } from "./monthsArray";
export function getMonthTotalHours(selectedMonth) {
  const currentDate = new Date();

  if (months.indexOf(selectedMonth) === currentDate.getMonth()) {
    const lastDayOfMonth = currentDate.getDate() - 1;
    const totalHours = lastDayOfMonth * 24;
    return totalHours;
  } else {
    const month = monthsDays.find(({ pt, en, days }) => {
      if (selectedMonth === pt) {
        return days;
      }
    });
    return month.days * 24;
  }
}
