import { months } from "@/src/data/dataTeacherRegistration";

export const getMonthNumberAsText = (monthNumber) => {
  return months[monthNumber - 1];
};
