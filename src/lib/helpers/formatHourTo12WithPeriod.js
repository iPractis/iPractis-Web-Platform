export const formatHourTo12WithPeriod = (hour) => {
  const adjustedHour = hour % 12 || 12; 
  const period = hour < 12 ? "AM" : "PM";
  return `${adjustedHour}:00 ${period}`;
};
