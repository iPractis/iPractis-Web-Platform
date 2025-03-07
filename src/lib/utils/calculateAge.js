import moment from "moment";

export const calculateAge = (date) => {
  const today = moment();
  const birthDate = moment(date, "YYYY/MM/D");
  
  return today.diff(birthDate, "years");
};
