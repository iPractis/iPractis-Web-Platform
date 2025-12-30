export function sumTimeStrings(timeArray) {
  let totalMinutes = 0;

  timeArray.forEach((timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    totalMinutes += hours * 60 + minutes;
  });

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}:${minutes.toString().padStart(2, "0")}`;
}
