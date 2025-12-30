"use client";

import React, { useEffect, useState, useMemo } from "react";
import dayjs from "dayjs";
import axios from "axios";
import Image from "next/image";

import DateStrip from "@/index";
import {
  CalendarAddIcon,
  Clock1215Icon,
  Clock1220Icon,
  DollarSignIcon,
  WalletMediumIcon,
} from "@/src/components/Icons";

import DurationToggle from "@/src/components/BookingSystem/DurationToggle";
import StripeCheckout from "@/src/components/Stripe/StripeCheckout";
import { useAuth } from "@/src/hooks/useAuth";

/* ---------------- CONFIG ---------------- */

/* ---------------- Utils ---------------- */
function formatCurrency(v) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(v);
}

/* =====================================================
   LessonBookingCard
===================================================== */
export default function LessonBookingCard({teacherId}) {

  const TEACHER_ID = teacherId;
  const { user } = useAuth();

  const viewerTimezone =
    Intl.DateTimeFormat().resolvedOptions().timeZone;

  /* ---------------- State ---------------- */
  const [availability, setAvailability] = useState(null);
  const [teacher, setTeacher] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const [clientSecret, setClientSecret] = useState(null);
  const [bookingStatus, setBookingStatus] = useState("idle");

  /* ---------------- Fetch availability ---------------- */
  useEffect(() => {
    fetch(
      `/api/availablity/${TEACHER_ID}?viewerTz=${viewerTimezone}`
    )
      .then((res) => res.json())
      .then((json) => {
        if (!json?.availability) return;

        setAvailability(json);

        const firstDate = Object.keys(json.availability)[0];
        if (!firstDate) return;

        setSelectedDate(firstDate);

        const durations = Object.keys(
          json.availability[firstDate]
        );
        setSelectedDuration(durations[0] ?? null);
      });
  }, [viewerTimezone]);

  /* ---------------- Fetch teacher ---------------- */
  useEffect(() => {
    axios
      .get(`/api/teachers/${TEACHER_ID}`)
      .then((res) => setTeacher(res.data));
  }, []);

  /* ---------------- Derived ---------------- */
  const availabilityForDay = useMemo(() => {
    if (!availability || !selectedDate) return {};
    return availability.availability[selectedDate] || {};
  }, [availability, selectedDate]);

  const slots = useMemo(() => {
    if (!selectedDuration) return [];
    return availabilityForDay[selectedDuration] || [];
  }, [availabilityForDay, selectedDuration]);

  const availableDates = useMemo(() => {
    if (!availability) return [];
    return Object.keys(availability.availability);
  }, [availability]);

  const weekDates = useMemo(() => {
    if (!availableDates.length) return [];
    return Array.from({ length: 7 }).map((_, i) =>
      dayjs(availableDates[0])
        .add(i, "day")
        .format("YYYY-MM-DD")
    );
  }, [availableDates]);

  const canSchedule =
    !!user &&
    !!selectedDate &&
    !!selectedDuration &&
    !!selectedTime &&
    bookingStatus !== "processing";

  const getTimeRange = () => {
    console.log(selectedDate, selectedDuration, selectedTime)
    if (!selectedDate || !selectedTime) return "";
    const start = dayjs(`${selectedDate} ${selectedTime}`);
    const end = start.add(Number(selectedDuration), "minute");
    return `${start.format("HH:mm")} – ${end.format("HH:mm")}`;
  };

  /* ---------------- Booking → Stripe Intent ---------------- */
  const handleBooking = async () => {
    if (!user) {
      alert("Please log in to continue");
      return;
    }
    try {
      setBookingStatus("processing");

      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teacherId: TEACHER_ID,
          studentId: user.user_id,
          date: selectedDate,
          time: `${selectedTime}:00`,
          duration: Number(selectedDuration),
          viewerTimezone,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setClientSecret(data.clientSecret);
      setBookingStatus("idle");
    } catch (err) {
      console.log(err)
      alert(err.message);
      setBookingStatus("error");
    }
  };

  /* ---------------- Guard ---------------- */
  if (!availability || !teacher) return null;

  /* =====================================================
     RENDER
  ===================================================== */
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* ================= CONTENT ================= */}
      <div className="flex-1 overflow-y-auto px-6 pt-6 pb-6 max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <WalletMediumIcon fillcolor="fill-primary-color-P4" />
          <h1 className="text-lg font-semibold">
            Schedule your lesson
          </h1>
        </div>

        {/* Teacher Card */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Image
              src={teacher.profile_image}
              width={64}
              height={64}
              alt={teacher.name}
              className="rounded-2xl object-cover"
            />
            <div>
              <p className="font-semibold text-sm">
                {teacher.name}
              </p>
              <p className="text-xs text-gray-500">
                {teacher.profile_title}
              </p>
            </div>
          </div>

          <div className="bg-[#F8F7F5] rounded-2xl p-2 flex items-center gap-2">
            <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-white">
              <DollarSignIcon fillcolor="fill-primary-color-P4" />
            </div>
            <div>
              <p className="text-[11px] text-gray-500">
                Lesson rate
              </p>
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold">
                  {formatCurrency(teacher.hourly_price * (selectedDuration/30))}
                </span>
                <span className="text-[10px] bg-yellow-100 px-1.5 py-0.5 rounded-md">
                  {selectedDuration || 30} mins
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Date */}
        <p className="text-sm font-semibold mb-2">Date</p>
        <DateStrip
          dates={weekDates}
          availableDates={availableDates}
          selectedDate={selectedDate}
          onSelect={(d) => {
            setSelectedDate(d);
            const durations = Object.keys(
              availability.availability[d] || {}
            );
            setSelectedDuration(durations[0] ?? null);
            setSelectedTime(null);
          }}
        />

        {/* Duration */}
        <p className="text-sm font-semibold mt-6 mb-2">
          Lesson duration
        </p>
        <DurationToggle
          durations={Object.keys(availabilityForDay)}
          selectedDuration={selectedDuration}
          onSelect={(d) => {
            setSelectedDuration(d);
            setSelectedTime(null);
          }}
        />

        {/* Time */}
        <p className="text-sm font-semibold mt-6 mb-2">
          Time
        </p>
        <div className="grid grid-cols-4 gap-2">
          {slots.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTime(t)}
              className={`py-2 rounded-lg border text-sm ${
                selectedTime === t
                  ? "bg-black text-white border-black"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Summary */}
        {selectedTime && (
          <div className="mt-6 space-y-3">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-xl bg-[#F8F7F5] flex items-center justify-center">
                <Clock1215Icon fillcolor="fill-primary-color-P4" />
              </div>
              <div>
                <p className="text-sm font-semibold">
                  Date and time
                </p>
                <p className="text-xs text-gray-500">
                  Set your schedule
                </p>
              </div>
            </div>

            <div className="bg-[#F8F7F5] rounded-2xl px-4 py-3 flex items-center gap-3 text-sm">
              <CalendarAddIcon fillcolor="fill-primary-color-P4" />
              {dayjs(selectedDate).format("DD MMM YYYY")}
            </div>

            <div className="bg-[#F8F7F5] rounded-2xl px-4 py-3 flex items-center gap-3 text-sm">
              <Clock1220Icon fillcolor="fill-primary-color-P4" />
              {getTimeRange()} · {viewerTimezone}
              {console.log(getTimeRange())}
            </div>
          </div>
        )}
      </div>

      {/* ================= FOOTER ================= */}
      <div className="border-t px-6 py-4">
        {clientSecret ? (
          <StripeCheckout clientSecret={clientSecret} />
        ) : (
          <button
            disabled={!canSchedule}
            onClick={handleBooking}
            className={`w-full py-3 rounded-xl font-medium ${
              canSchedule
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-400"
            }`}
          >
            {bookingStatus === "processing"
              ? "Preparing payment…"
              : "Schedule & Pay"}
          </button>
        )}
      </div>
    </div>
  );
}
