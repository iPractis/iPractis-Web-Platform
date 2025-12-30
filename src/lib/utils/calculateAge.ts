import dayjs from "dayjs";

export const calculateAge = (date) => {
  const today = dayjs();
  const birthDate = dayjs(date, "YYYY/MM/D");
  
  return today.diff(birthDate, "year");
};
