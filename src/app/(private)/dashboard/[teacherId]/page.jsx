"use client";

import React, { use, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import PayPalPayment from "@/src/components/Payment/PayPalButton";
import { useAuth } from "@/src/hooks/useAuth";
import dayjs from "dayjs";
import axios from "axios";

/* ---------------------------
   Utilities
   --------------------------- */
function formatCurrency(v) {
  if (typeof v !== "number") return v;
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v);
}
const WEEKDAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function isoDate(d) {
  return d.toISOString().split("T")[0];
}
function dateToFriendly(d) {
  return new Date(d).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}
function isSameDate(a, b) {
  return a && b && isoDate(new Date(a)) === isoDate(new Date(b));
}

/* ---------------------------
   Skeleton Loader
   --------------------------- */
function SkeletonCard({ className = "" }) {
  return (
    <div className={`animate-pulse bg-white rounded-lg shadow p-6 ${className}`}>
      <div className="h-44 bg-gray-100 rounded-lg mb-4" />
      <div className="h-6 bg-gray-100 rounded mb-2 w-3/4" />
      <div className="h-4 bg-gray-100 rounded w-1/2" />
    </div>
  );
}

/* ---------------------------
   LEFT: Teacher Info Panel
   --------------------------- */
function TeacherInfoPanel({ teacher }) {
  return (
    <aside className="bg-white rounded-lg shadow p-6 sticky top-6 self-start">
      <div className="flex items-center gap-4">
        <div className="relative h-24 w-24 rounded-lg overflow-hidden bg-gradient-to-br from-primary-color-P1 to-primary-color-P2 flex items-center justify-center">
          {teacher.profile_image ? (
            <Image src={teacher.profile_image} alt={teacher.name} fill className="object-cover" />
          ) : (
            <div className="text-white text-3xl font-bold">
              {teacher.first_name?.charAt(0) || "T"}
              {teacher.last_name?.charAt(0) || ""}
            </div>
          )}
        </div>

        <div>
          <div className="text-xl font-bold">{teacher.name}</div>
          <div className="text-sm text-gray-500">{teacher.profile_title || teacher.subject}</div>
          <div className="mt-2 text-primary-color-P4 font-semibold">{formatCurrency(teacher.hourly_price)} / hr</div>
        </div>
      </div>

      <div className="mt-6 space-y-4 text-sm text-gray-700">
        <div>
          <div className="text-xs text-gray-500">Timezone</div>
          <div className="font-medium">{teacher.timezone || "UTC"}</div>
        </div>

        <div>
          <div className="text-xs text-gray-500">Country</div>
          <div className="font-medium">{teacher.country || "—"}</div>
        </div>

        <div>
          <div className="text-xs text-gray-500">Languages</div>
          <div className="font-medium">
            {teacher.teacher_languages && teacher.teacher_languages.length > 0
              ? teacher.teacher_languages.map((l) => l.name).join(", ")
              : "—"}
          </div>
        </div>

        <div>
          <div className="text-xs text-gray-500">Daily Work Hours</div>
          <div className="font-medium">{teacher.daily_work_time || "—"} hrs</div>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="font-semibold mb-2">About</h4>
        <p className="text-sm text-gray-700">{teacher.introduction || "No description provided."}</p>
      </div>

      <div className="mt-6">
        <h4 className="font-semibold mb-2">Specializations</h4>
        <div className="flex flex-wrap gap-2">
          {teacher.teacher_sub_subjects && teacher.teacher_sub_subjects.length > 0 ? (
            teacher.teacher_sub_subjects.map((s) => (
              <span key={s.id} className="px-3 py-1 bg-primary-color-P11 text-primary-color-P4 rounded-full text-sm">
                {s.name}
              </span>
            ))
          ) : (
            <div className="text-gray-500 text-sm">None listed</div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <h4 className="font-semibold mb-2">Experience</h4>
        <div className="space-y-3">
          {teacher.teacher_experiences && teacher.teacher_experiences.length > 0 ? (
            teacher.teacher_experiences.map((exp) => (
              <div key={exp.id} className="p-3 rounded border border-gray-100">
                <div className="font-semibold">{exp.company}</div>
                <div className="text-xs text-gray-500">
                  {exp.year_from} — {exp.year_to}
                </div>
                <div className="text-sm text-gray-700 mt-2">{exp.description}</div>
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-sm">No work experience listed</div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <h4 className="font-semibold mb-2">Education</h4>
        <div className="space-y-3">
          {teacher.teacher_education && teacher.teacher_education.length > 0 ? (
            teacher.teacher_education.map((edu) => (
              <div key={edu.id} className="p-3 rounded border border-gray-100">
                <div className="font-semibold">{edu.institution}</div>
                <div className="text-xs text-gray-500">
                  {edu.year_from} — {edu.year_to}
                </div>
                <div className="text-sm text-gray-700 mt-2">{edu.description}</div>
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-sm">No education listed</div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <Link
          href={`/teachers/${teacher.teacher_id}/message`}
          className="block text-center text-sm text-primary-color-P4 hover:underline"
        >
          Message teacher
        </Link>
      </div>
    </aside>
  );
}

/* ---------------------------
   RIGHT: Booking Calendar (updated for past dates)
   --------------------------- */
function BookingCalendar({ availability = [], selectedDateISO, onDateTimeSelect }) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });

  const [selectedDate, setSelectedDate] = useState(
    selectedDateISO ? new Date(selectedDateISO) : null
  );

  useEffect(() => {
    if (selectedDateISO) setSelectedDate(new Date(selectedDateISO));
  }, [selectedDateISO]);

  // Convert availability into a map: { Mon: ["09:00","10:00"], ... }
  const availMap = useMemo(() => {
    const m = {};
    availability.forEach((a) => {
      m[a.day] = a.hours ? a.hours.slice() : []; // <-- FIX HERE
    });
    return m;
  }, [availability]);

  function getSlotsForDate(d) {
    if (!d) return [];
    const dayName = WEEKDAY_NAMES[d.getDay()];
    return (availMap[dayName] || []).slice().sort();
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Build 6×7 grid (42 days)
  const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const startDay = monthStart.getDay(); // 0-6
  const dates = Array.from({ length: 42 }).map((_, i) => {
    return new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i - startDay + 1);
  });

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Pick a date</h2>

        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={() => setCurrentMonth(m => new Date(m.getFullYear(), m.getMonth() - 1, 1))}
            className="px-2 py-1 rounded hover:bg-gray-100"
          >
            ◀
          </button>

          <div className="font-semibold">
            {currentMonth.toLocaleString(undefined, { month: "long" })}{" "}
            {currentMonth.getFullYear()}
          </div>

          <button
            onClick={() => setCurrentMonth(m => new Date(m.getFullYear(), m.getMonth() + 1, 1))}
            className="px-2 py-1 rounded hover:bg-gray-100"
          >
            ▶
          </button>
        </div>
      </div>

      {/* Weekday headings */}
      <div className="grid grid-cols-7 gap-2 text-center text-xs mb-2">
        {WEEKDAY_NAMES.map((d) => (
          <div key={d} className="font-semibold text-gray-600">{d}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {dates.map((d, i) => {
          const iso = isoDate(d);
          const isCurrentMonth = d.getMonth() === currentMonth.getMonth();
          const slots = getSlotsForDate(d);

          const isPast = d < today;
          const isDisabled = isPast || slots.length === 0;
          const isSelected = selectedDate && isoDate(selectedDate) === iso;

          return (
            <button
              key={i}
              onClick={() => {
                if (!isDisabled) {
                  setSelectedDate(d);
                  onDateTimeSelect(iso, null);
                }
              }}
              disabled={isDisabled}
              className={`rounded p-2 h-12 flex flex-col items-center justify-center text-sm transition
                ${isCurrentMonth ? "" : "opacity-40"}
                ${isDisabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white hover:bg-gray-100"}
                ${isSelected ? "bg-primary-color-P4 text-white" : ""}
              `}
            >
              <div className="font-medium">{d.getDate()}</div>

              {!isPast ? (
                <div className="text-xs mt-1 text-green-600">
                  {slots.length} slot{slots.length !== 1 ? "s" : ""}
                </div>
              ) : (
                <div className="text-xs mt-1 text-gray-300">—</div>
              )}
            </button>
          );
        })}
      </div>

      {/* Time slots */}
      <div className="mt-6">
        {selectedDate ? (
          <>
            <div className="flex items-center justify-between mb-3">
              <div className="font-semibold">Available times</div>
              <div className="text-sm text-gray-500">{dateToFriendly(selectedDate)}</div>
            </div>

            <div className="flex flex-wrap gap-2">
              {getSlotsForDate(selectedDate).map((t) => (
                <button
                  key={t}
                  onClick={() => onDateTimeSelect(isoDate(selectedDate), t)}
                  className="px-3 py-1 border rounded hover:bg-gray-100 text-sm"
                >
                  {t}
                </button>
              ))}

              {getSlotsForDate(selectedDate).length === 0 && (
                <div className="text-gray-500">No times on this date.</div>
              )}
            </div>
          </>
        ) : (
          <div className="text-gray-500">Select a date on the calendar to view times.</div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------
   RIGHT: Order Summary Section
   --------------------------- */
function OrderSummary({ teacher, selectedDate, selectedTime, onSuccess, bookingStatus, booking }) {
  const disabled = !selectedDate || !selectedTime;

  return (
    <div className="bg-gradient-to-br from-primary-color-P1 to-primary-color-P2 text-white rounded-lg shadow p-6">
      <div className="font-semibold mb-4">Order Summary</div>

      <div className="flex justify-between text-sm mb-2">
        <span>Teacher</span>
        <span className="font-medium">{teacher.name}</span>
      </div>

      <div className="flex justify-between text-sm mb-2">
        <span>Lesson Fee</span>
        <span className="font-medium">{formatCurrency(teacher.hourly_price)}</span>
      </div>

      <div className="flex justify-between text-sm mb-4">
        <span>Duration</span>
        <span>1 hour</span>
      </div>

      <div className="border-t border-white/30 pt-3 flex justify-between font-bold text-lg mb-4">
        <span>Total</span>
        <span>{formatCurrency(teacher.hourly_price)}</span>
      </div>

      {disabled ? (
        <div className="mt-2 p-3 bg-white/20 rounded text-center text-sm">
          Select date & time to continue
        </div>
      ) : (
        <div>
          <PayPalPayment
            amount={teacher.hourly_price}
            description={`Lesson with ${teacher.name} on ${selectedDate} at ${selectedTime}`}
            onSuccess={onSuccess}
          />

          {bookingStatus === "processing" && (
            <div className="mt-3 bg-yellow-400 text-yellow-900 rounded-lg p-3 text-sm text-center font-semibold">
              Processing...
            </div>
          )}
          {bookingStatus === "success" && (
            <div className="mt-3 bg-green-50 text-green-800 rounded-lg p-3 text-sm text-center font-semibold">
              Booking confirmed — redirecting…
            </div>
          )}
          {bookingStatus === "error" && (
            <div className="mt-3 bg-red-50 text-red-800 rounded-lg p-3 text-sm text-center font-semibold">
              Failed to save booking. Try again.
            </div>
          )}
        </div>
      )}
      <button onClick={booking}>Book & Pay Later</button>
    </div>
  );
}

/* ---------------------------
   PAGE: Entire 2-column layout
   --------------------------- */
export default function TeacherBookingPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const teacherId = params.teacherId;

  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingStatus, setBookingStatus] = useState("idle");


  const [time, setTime] = useState();

  useEffect(()=>{
    const data= axios.get("/api/availablity/"+teacherId).then(res=>{
      setTime(res.data.availability);
    }).catch(err=>{console.log(err);
    });
  },[])

  useEffect(() => {
    let active = true;

    async function loadTeacher() {
      try {
        setLoading(true);
        const res = await fetch(`/api/teachers/${teacherId}`);
        if (!res.ok) throw new Error("Failed to fetch teacher");
        const data = await res.json();
        if (active) setTeacher(data);
      } catch (err) {
        if (active) setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    }

    if (teacherId) loadTeacher();
    return () => (active = false);
  }, [teacherId]);


const handleBooking = async () => {
  if (!selectedDate || !selectedTime) {
    alert("Please select date and time");
    return;
  }

  // FIX: Add +1 day to date
  const correctedDate = dayjs(selectedDate)
    .add(1, "day")
    .format("YYYY-MM-DD");

  try {
    setBookingStatus("processing");

    const res = await fetch("/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        teacherId: teacher.teacher_id,
        studentId: user?.userId,
        date: correctedDate,
        time: selectedTime + ":00", // HH:mm → HH:mm:00
      }),
    });

    const data = await res.json();
    console.log("Book Result:", data);

    if (!res.ok) {
      setBookingStatus("error");
      alert(data.error || "Failed to book slot");
      return;
    }

    setBookingStatus("success");
    alert("Booking created successfully!");
  } catch (err) {
    console.error(err);
    setBookingStatus("error");
    alert("Server error");
  }
};


  /* -------------------------------------
     PayPal Success → Save Booking
     ------------------------------------- */
  const handlePaymentSuccess = async (paymentResult) => {
    setBookingStatus("processing");

    try {
      const bookingData = {
        studentId: user?.userId,
        studentName: `${user?.firstName || ""} ${user?.lastName || ""}`.trim(),
        studentEmail: user?.email,
        teacherId: teacher.teacher_id,
        teacherName: teacher.name,
        date: selectedDate,
        time: selectedTime,
        amount: teacher.hourly_price,
        duration: 1,
        paymentId: paymentResult?.orderID || paymentResult?.id,
        status: "confirmed",
      };

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (!res.ok) throw new Error("Failed to save booking");

      setBookingStatus("success");
      setTimeout(() => router.push("/dashboard"), 1200);
    } catch (err) {
      setBookingStatus("error");
      console.error(err);
    }
  };

  /* -------------------------------------
     RENDER
     ------------------------------------- */
  if (loading)
    return (
      <main className="min-h-screen py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SkeletonCard className="lg:col-span-1" />
          <SkeletonCard className="lg:col-span-2" />
        </div>
      </main>
    );

  if (error || !teacher)
    return (
      <main className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/dashboard" className="text-primary-color-P4 hover:underline mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-800">Error: {error || "Teacher not found"}</p>
          </div>
        </div>
      </main>
    );

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT: Full teacher profile */}
        <TeacherInfoPanel teacher={teacher} />

        {/* RIGHT: Booking (calendar + summary) */}
        <div className="lg:col-span-2 space-y-6">

          {/* Header */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between gap-6">
              <div>
                <h1 className="text-2xl font-extrabold text-primary-color-P1">{teacher.name}</h1>
                <div className="text-sm text-gray-500">{teacher.profile_title || teacher.subject}</div>
              </div>

              <div className="text-right">
                <div className="text-xs text-gray-500">Rate</div>
                <div className="font-semibold text-lg">{formatCurrency(teacher.hourly_price)}</div>
              </div>
            </div>
          </div>

          {/* Calendar + summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BookingCalendar
              availability={time}
              selectedDateISO={selectedDate}
              onDateTimeSelect={(dateISO, time) => {
                setSelectedDate(dateISO || "");
                setSelectedTime(time || "");
              }}
            />

            <div className="space-y-6">
              {/* Selected slot */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold mb-3">Selected Slot</h3>
                <div className="text-sm text-gray-700">
                  <div>
                    <strong>Date:</strong>{" "}
                    {selectedDate ? dateToFriendly(selectedDate) : "—"}
                  </div>
                  <div>
                    <strong>Time:</strong> {selectedTime || "—"}
                  </div>
                  <div>
                    <strong>Duration:</strong> 1 hour
                  </div>
                </div>
              </div>

              <OrderSummary
                teacher={teacher}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onSuccess={handlePaymentSuccess}
                booking={handleBooking}
                bookingStatus={bookingStatus}
              />
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
