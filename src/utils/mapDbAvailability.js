// utils/mapDbAvailability.js
export const mapDbAvailability = (dbSlots = []) => {
  const grouped = {};

  dbSlots.forEach((slot) => {
    const day = slot.dayOfWeek;

    // Normalize "HH:mm:ss" to UI’s format
    const [hh, mm] = slot.hour.split(":");
    const normalized = `${parseInt(hh, 10)}:${mm}`; 
    // → "01:00:00" → "1:00"
    // → "00:30:00" → "0:30"

    if (!grouped[day]) grouped[day] = [];
    grouped[day].push(normalized);
  });

  const data = Object.entries(grouped).map(([day, hours]) => ({
    day,
    hour: hours.sort((a, b) => {
      const [ah, am] = a.split(":").map(Number);
      const [bh, bm] = b.split(":").map(Number);
      return ah - bh || am - bm;
    }),
  }));

  return data;
};


// utils/mapUiToDbAvailability.js
// utils/mapUiToDbAvailability.js
export const mapUiToDbAvailability = (uiSlots = []) => {
  return uiSlots.flatMap((slot) =>
    slot.hour.map((h) => {
      let [hh, mm] = h.split(":");
      hh = hh.padStart(2, "0");
      mm = mm.padStart(2, "0");
      return {
        day_of_week: slot.day,       // ✅ matches DB column
        hour: `${hh}:${mm}:00`,      // ✅ Postgres `time` type
      };
    })
  );
};
