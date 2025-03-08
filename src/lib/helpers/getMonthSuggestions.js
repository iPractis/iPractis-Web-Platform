import { months } from "@/src/data/dataTeacherRegistration";

export const getMonthSuggestions = (inputValue) => {
  return months.filter((month) =>
    month.toLowerCase().startsWith(inputValue.toLowerCase())
  );
};
