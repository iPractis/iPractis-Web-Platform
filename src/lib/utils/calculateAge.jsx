import moment from "moment";

export const calculateAge = (date) => {
  const today = moment();
  const birthDate = moment(date, "D/MM/YYYY");
  
  return today.diff(birthDate, "years");
};
