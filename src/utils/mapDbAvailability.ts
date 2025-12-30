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


/**
 * Converts UI availability [{ day: 'Mon', hour: ['09:00', '09:30'] }, ...]
 * into DB-ready slot rows.
 */
export function mapUiToDbAvailability(uiAvailability, teacherId) {
  const slots = [];

  for (const { day, hour } of uiAvailability) {
    for (const h of hour) {
      const [hr, min] = h.split(":");
      const formattedTime = `${hr.padStart(2, "0")}:${min.padStart(2, "0")}:00`;

      slots.push({
        teacher_id: teacherId,
        day_of_week: day,
        hour: formattedTime,
        is_available: true,
      });
    }
  }

  return slots;
}

