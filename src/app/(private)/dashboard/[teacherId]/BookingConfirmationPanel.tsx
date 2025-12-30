import dayjs from "dayjs";

export function BookingConfirmationPanel({
  teacher,
  selectedDate,
  selectedTime,
  onConfirm,
  loading,
  onBack,
}) {
  const dateLabel = dayjs(
    `${selectedDate} ${selectedTime}`
  ).format("D MMMM");

  const yearLabel = dayjs(
    `${selectedDate} ${selectedTime}`
  ).format("YYYY");

  const timeLabel = dayjs(
    `${selectedDate} ${selectedTime}`
  ).format("HH:mm (hh:mm A)");

  return (
    <div className="bg-white rounded-xl shadow p-5 max-w-md mx-auto">
      {/* -----------------------
         Teacher header
      ----------------------- */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <img
            src={teacher.profile_image}
            alt={teacher.name}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div>
            <div className="font-semibold">{teacher.name}</div>
            <div className="text-xs text-gray-500">
              Teaches {teacher.profile_title}
            </div>
          </div>
        </div>

        <div className="bg-gray-100 rounded-full px-3 py-1 text-xs font-medium">
          {teacher.hourly_price} USD · 30min
        </div>
      </div>

      {/* -----------------------
         Lesson type
      ----------------------- */}
      <Section title="Lesson type" subtitle="Select session frequency">
        <RadioRow options={["Single", "Weekly"]} />
      </Section>

      {/* -----------------------
         Lesson target
      ----------------------- */}
      <Section title="Lesson’s target" subtitle="Select session frequency">
        <RadioRow options={["Single", "Weekly"]} />
      </Section>

      {/* -----------------------
         Lesson duration
      ----------------------- */}
      <Section title="Lesson duration" subtitle="Choose duration format">
        <div className="bg-gray-100 rounded-lg px-4 py-3 text-sm font-medium">
          25 mins
        </div>
      </Section>

      {/* -----------------------
         Date & Time
      ----------------------- */}
      <Section title="Date and time" subtitle="Set your schedule">
        <div className="flex gap-2">
          <div className="flex-1 bg-gray-100 rounded-lg px-3 py-2 text-sm">
            {dateLabel}
          </div>
          <div className="w-20 bg-gray-100 rounded-lg px-3 py-2 text-sm">
            {yearLabel}
          </div>
        </div>

        <div className="mt-2 bg-gray-100 rounded-lg px-3 py-2 text-sm">
          {timeLabel} · {teacher.timezone}
        </div>
      </Section>

      {/* -----------------------
         Pricing
      ----------------------- */}
      <div className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Shopping</span>
          <span>{teacher.hourly_price} USD</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Service fees</span>
          <span>0 USD</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">0% VAT</span>
          <span>0 USD</span>
        </div>
      </div>

      {/* -----------------------
         Footer actions
      ----------------------- */}
      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="flex-1 border rounded-lg py-2 text-sm"
        >
          ← Back
        </button>

        <button
          onClick={onConfirm}
          disabled={loading}
          className="flex-1 bg-primary-color-P4 text-white rounded-lg py-2 text-sm font-medium"
        >
          {loading ? "Scheduling…" : "Schedule lesson"}
        </button>
      </div>
    </div>
  );
}

/* -----------------------
   Helper components
----------------------- */

function Section({ title, subtitle, children }) {
  return (
    <div className="mb-4">
      <div className="text-sm font-medium">{title}</div>
      <div className="text-xs text-gray-500 mb-2">{subtitle}</div>
      {children}
    </div>
  );
}

function RadioRow({ options }) {
  return (
    <div className="flex gap-2">
      {options.map((opt) => (
        <label
          key={opt}
          className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 text-sm cursor-pointer"
        >
          <input type="radio" name={opt} />
          {opt}
        </label>
      ))}
    </div>
  );
}
