"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/src/hooks/useAuth";
import dayjs from "dayjs";
import axios from "axios";
import StripeCheckout from "@/src/components/Stripe/StripeCheckout";

/* ---------------------------
   Utilities
--------------------------- */
function formatCurrency(v) {
  if (typeof v !== "number") return v;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(v);
}

const WEEKDAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function isoDate(d) {
  return d.toISOString().split("T")[0];
}

function dateToFriendly(d) {
  return new Date(d).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/* ---------------------------
   LEFT: Teacher Info Panel
--------------------------- */
function TeacherInfoPanel({ teacher }) {
  return (
    <aside className="bg-white rounded-lg shadow p-6 sticky top-6 self-start">
      <div className="flex items-center gap-4">
        <div className="relative h-24 w-24 rounded-lg overflow-hidden bg-gray-200">
          {teacher.profile_image ? (
            <Image src={teacher.profile_image} alt={teacher.name} fill className="object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full text-3xl font-bold text-white bg-black">
              {teacher.first_name?.charAt(0)}
            </div>
          )}
        </div>

        <div>
          <div className="text-xl font-bold">{teacher.name}</div>
          <div className="text-sm text-gray-500">{teacher.profile_title}</div>
          <div className="mt-2 font-semibold">{formatCurrency(teacher.hourly_price)} / hr</div>
        </div>
      </div>

      <div className="mt-6 text-sm">
        <div className="text-xs text-gray-500">Timezone</div>
        <div className="font-medium">{teacher.timezone}</div>
      </div>
    </aside>
  );
}

/* ---------------------------
   Booking Calendar (FIXED)
--------------------------- */
function BookingCalendar({
  availability = [],
  teacherTimezone = "UTC",
  selectedDateISO,
  onDateTimeSelect,
}) {
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

  const availMap = useMemo(() => {
    const m = {};
    availability.forEach((a) => {
      m[a.day] = a.hours || [];
    });
    return m;
  }, [availability]);

  function getSlotsForDate(d) {
    if (!d) return [];
    const teacherDate = new Date(
      d.toLocaleString("en-US", { timeZone: teacherTimezone })
    );
    const dayName = WEEKDAY_NAMES[teacherDate.getDay()];
    return (availMap[dayName] || []).slice().sort();
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const startDay = monthStart.getDay();

  const dates = Array.from({ length: 42 }).map((_, i) => {
    return new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i - startDay + 1);
  });

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-bold mb-4">Pick a date</h2>

      <div className="grid grid-cols-7 gap-2 text-xs mb-2 text-center">
        {WEEKDAY_NAMES.map((d) => (
          <div key={d} className="font-semibold">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {dates.map((d, i) => {
          const iso = isoDate(d);
          const slots = getSlotsForDate(d);
          const isPast = d < today;
          const disabled = isPast || slots.length === 0;

          return (
            <button
              key={i}
              disabled={disabled}
              onClick={() => {
                setSelectedDate(d);
                onDateTimeSelect(iso, null);
              }}
              className={`p-2 rounded text-sm ${
                disabled ? "bg-gray-100 text-gray-400" : "hover:bg-gray-100"
              }`}
            >
              {d.getDate()}
              {!disabled && (
                <div className="text-xs text-green-600">
                  {slots.length} slots
                </div>
              )}
            </button>
          );
        })}
      </div>

      {selectedDate && (
        <div className="mt-6">
          <div className="font-semibold mb-2">
            Available times — {dateToFriendly(selectedDate)}
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
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------------------
   Order Summary (STRIPE)
--------------------------- */
function OrderSummary({
  teacher,
  selectedDate,
  selectedTime,
  booking,
  bookingStatus,
  clientSecret,
}) {
  const disabled = !selectedDate || !selectedTime;

  return (
    <div className="bg-black text-white rounded-lg p-6">
      <div className="font-semibold mb-4">Order Summary</div>

      <div className="flex justify-between text-sm mb-2">
        <span>Total</span>
        <span>{formatCurrency(teacher.hourly_price)}</span>
      </div>

      {disabled ? (
        <div className="opacity-60 text-sm">Select date & time</div>
      ) : clientSecret ? (
        <StripeCheckout clientSecret={clientSecret} />
      ) : (
        <button
          onClick={booking}
          className="w-full bg-white text-black py-2 rounded mt-4"
        >
          Pay & Confirm Booking
        </button>
      )}

      {bookingStatus === "processing" && (
        <div className="mt-3 text-yellow-300 text-sm">Processing…</div>
      )}
    </div>
  );
}

/* ---------------------------
   PAGE
--------------------------- */
export default function TeacherBookingPage() {
  const { teacherId } = useParams();
  const { user } = useAuth();

  const [teacher, setTeacher] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [clientSecret, setClientSecret] = useState(null);
  const [bookingStatus, setBookingStatus] = useState("idle");

  useEffect(() => {
    fetch(`/api/teachers/${teacherId}`)
      .then((r) => r.json())
      .then(setTeacher);

    axios.get(`/api/availablity/${teacherId}`).then((res) => {
      setAvailability(res.data.availability);
    });
  }, [teacherId]);

  const handleBooking = async () => {
    try {
      setBookingStatus("processing");

      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teacherId,
          studentId: user.userId,
          date: selectedDate,
          time: selectedTime + ":00",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setClientSecret(data.clientSecret);
      setBookingStatus("idle");
    } catch (e) {
      alert(e.message);
      setBookingStatus("error");
    }
  };

  if (!teacher) return null;

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TeacherInfoPanel teacher={teacher} />

        <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BookingCalendar
            availability={availability}
            teacherTimezone={teacher.timezone}
            selectedDateISO={selectedDate}
            onDateTimeSelect={(d, t) => {
              setSelectedDate(d || "");
              setSelectedTime(t || "");
            }}
          />

          <OrderSummary
            teacher={teacher}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            booking={handleBooking}
            bookingStatus={bookingStatus}
            clientSecret={clientSecret}
          />
        </div>
      </div>
    </main>
  );
}
