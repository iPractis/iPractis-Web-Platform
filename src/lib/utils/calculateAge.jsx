import dayjs from "dayjs";

export const calculateAge = (dateString) => {
  const birthDate = dayjs(dateString);
  const today = dayjs();
  return today.diff(birthDate, "year");
};
