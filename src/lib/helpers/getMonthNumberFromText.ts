import { months } from "@/src/data/dataTeacherRegistration";

export const getMonthNumberFromText = (monthText) => {
  const matchedMonth = months.find((month) =>
    month.toLowerCase().startsWith(monthText.toLowerCase())
  );
  return matchedMonth ? months.indexOf(matchedMonth) + 1 : null;
};
