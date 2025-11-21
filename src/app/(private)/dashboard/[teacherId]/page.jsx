"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import PayPalPayment from "@/src/components/Payment/PayPalButton";
import { useAuth } from "@/src/hooks/useAuth";

// Teacher booking page — full overwrite (Option B)
// - Clean, centered layout
// - Weekly 7-day grid (WeeklyBookingGrid component included)
// - Single Order Summary + PayPal button
// - Uses teacher.availability to render slots

function SkeletonCard({ className = "" }) {
  return (
    <div className={`animate-pulse bg-white rounded-lg shadow p-6 ${className}`}>
      <div className="h-44 bg-gray-100 rounded-lg mb-4" />
      <div className="h-6 bg-gray-100 rounded mb-2 w-3/4" />
      <div className="h-4 bg-gray-100 rounded w-1/2" />
    </div>
  );
}

function Tabs({ tabs = [], active, onChange }) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-lg p-1 shadow-sm">
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            active === t.key ? "bg-primary-color-P4 text-white shadow" : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

function formatCurrency(v) {
  if (typeof v !== "number") return v;
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v);
}

// --- WeeklyBookingGrid component (embedded) ---
const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function formatDateISO(date) {
  return date.toISOString().split("T")[0];
}
function timeToMinutes(t) {
  const [hStr, mStr] = (t || "").split(":");
  const h = Number(hStr || 0);
  const m = Number(mStr || 0);
  return h * 60 + m;
}

function WeeklyBookingGrid({ availability = [], selectedDate, selectedTime, onSelect, daysToShow = 7 }) {
  // Build days array (today -> today + daysToShow-1)
  const days = useMemo(() => {
    const arr = [];
    const today = new Date();
    for (let i = 0; i < daysToShow; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      arr.push(d);
    }
    return arr;
  }, [daysToShow]);

  // map availability
  const availMap = useMemo(() => {
    const map = {};
    (availability || []).forEach((a) => {
      map[a.day] = (a.hour || []).slice();
    });
    return map;
  }, [availability]);

  // filter early times: keep >= 06:00
  const MIN_MINUTES = 6 * 60;

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4">Pick a slot (weekly)</h3>
      <div className="bg-white rounded-lg border shadow-sm p-4">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
          {days.map((d) => {
            const iso = formatDateISO(d);
            const dayName = weekdayNames[d.getDay()];
            const rawSlots = availMap[dayName] || [];
            const slots = rawSlots
              .map((s) => s.trim())
              .filter((s) => !Number.isNaN(timeToMinutes(s)) && timeToMinutes(s) >= MIN_MINUTES)
              .sort((a, b) => timeToMinutes(a) - timeToMinutes(b));

            const isPast = new Date(iso) < new Date(new Date().setHours(0, 0, 0, 0));

            return (
              <div key={iso} className="p-3 rounded-md border min-h-[120px] flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <div className={`font-semibold ${isPast ? "text-gray-400" : "text-primary-color-P1"}`}>{dayName}</div>
                  <div className="text-xs text-gray-500">{d.toLocaleDateString(undefined, { month: "short", day: "numeric" })}</div>
                </div>

                <div className="flex-1">
                  {slots.length === 0 ? (
                    <div className="text-xs text-gray-400">No slots</div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      {slots.map((t) => {
                        const active = selectedDate === iso && selectedTime === t;
                        return (
                          <button
                            key={t}
                            disabled={isPast}
                            onClick={() => onSelect(iso, t)}
                            className={`text-sm px-2 py-1 rounded-full w-full text-left transition ${
                              isPast
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : active
                                ? "bg-primary-color-P4 text-white"
                                : "bg-white border hover:bg-gray-50"
                            }`}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// --- Main Page ---
export default function TeacherDashboardPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const teacherId = params.teacherId;

  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingStatus, setBookingStatus] = useState("idle");

  useEffect(() => {
    let mounted = true;
    const fetchTeacher = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/teachers/${teacherId}`);
        if (!res.ok) throw new Error("Failed to fetch teacher");
        const data = await res.json();
        if (!mounted) return;
        setTeacher(data);
      } catch (err) {
        if (!mounted) return;
        setError(err.message || "Unable to load teacher");
        console.error(err);
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    if (teacherId) fetchTeacher();
    return () => {
      mounted = false;
    };
  }, [teacherId]);

  const availableTimes = useMemo(() => {
    if (!teacher?.availability || !selectedDate) return [];
    const dateObj = new Date(selectedDate);
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayName = dayNames[dateObj.getDay()];
    const dayAvailability = teacher.availability.find((a) => a.day === dayName);
    return dayAvailability?.hour || [];
  }, [teacher, selectedDate]);

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
      console.error(err);
      setBookingStatus("error");
    }
  };

  if (loading)
    return (
      <main className="min-h-screen  py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </main>
    );

  if (error || !teacher)
    return (
      <main className="min-h-screen  py-8 px-4">
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

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "experience", label: "Experience" },
    { key: "availability", label: "Availability" },
    { key: "booking", label: "Booking" },
  ];

  return (
    <main className="min-h-screen  py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-primary-color-P4 hover:underline">
              ← Back
            </Link>
            <h1 className="text-2xl font-extrabold text-primary-color-P1">{teacher.name}</h1>
            <span className="text-sm text-gray-500">{teacher.profile_title}</span>
          </div>

          <div className="text-right">
            <div className="text-sm text-gray-500">Timezone</div>
            <div className="font-medium">{teacher.timezone || "UTC"}</div>
          </div>
        </div>

        {/* Header card */}
        <div className="bg-white rounded-lg shadow p-6 mb-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1 flex items-center gap-4">
            <div className="relative h-28 w-28 rounded-lg overflow-hidden bg-gradient-to-br from-primary-color-P1 to-primary-color-P2 flex items-center justify-center">
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
              <div className="text-lg font-bold">{teacher.name}</div>
              <div className="text-sm text-gray-500">{teacher.subject}</div>
              <div className="mt-2 text-primary-color-P4 font-semibold">{formatCurrency(teacher.hourly_price)} / hr</div>
            </div>
          </div>

          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-gray-50">
              <div className="text-xs text-gray-500">Country</div>
              <div className="font-medium">{teacher.country || "—"}</div>
            </div>
            <div className="p-4 rounded-lg bg-gray-50">
              <div className="text-xs text-gray-500">Languages</div>
              <div className="font-medium">
                {teacher.teacher_languages && teacher.teacher_languages.length > 0
                  ? teacher.teacher_languages.map((l) => l.name).join(", ")
                  : "—"}
              </div>
            </div>
            <div className="p-4 rounded-lg bg-gray-50">
              <div className="text-xs text-gray-500">Daily Work Hours</div>
              <div className="font-medium">{teacher.daily_work_time || "—"} hrs</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === "overview" && (
            <section>
              <h2 className="text-xl font-bold mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed">{teacher.introduction}</p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">What I Teach</h3>
                  <p className="text-gray-700">{teacher.subject_intro}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Specializations</h3>
                  <div className="flex flex-wrap gap-2">
                    {teacher.teacher_sub_subjects && teacher.teacher_sub_subjects.length > 0 ? (
                      teacher.teacher_sub_subjects.map((s) => (
                        <span key={s.id} className="px-3 py-1 bg-primary-color-P11 text-primary-color-P4 rounded-full text-sm">{s.name}</span>
                      ))
                    ) : (
                      <div className="text-gray-500">None listed</div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeTab === "experience" && (
            <section>
              <h2 className="text-xl font-bold mb-4">Experience & Education</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Work Experience</h3>
                  {teacher.teacher_experiences && teacher.teacher_experiences.length > 0 ? (
                    teacher.teacher_experiences.map((exp) => (
                      <div key={exp.id} className="mb-4 p-4 rounded border border-gray-100">
                        <div className="font-semibold">{exp.company}</div>
                        <div className="text-sm text-gray-500">{exp.year_from} — {exp.year_to}</div>
                        <div className="mt-2 text-gray-700">{exp.description}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500">No work experience listed</div>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Education</h3>
                  {teacher.teacher_education && teacher.teacher_education.length > 0 ? (
                    teacher.teacher_education.map((edu) => (
                      <div key={edu.id} className="mb-4 p-4 rounded border border-gray-100">
                        <div className="font-semibold">{edu.institution}</div>
                        <div className="text-sm text-gray-500">{edu.year_from} — {edu.year_to}</div>
                        <div className="mt-2 text-gray-700">{edu.description}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500">No education listed</div>
                  )}
                </div>
              </div>
            </section>
          )}

          {activeTab === "availability" && (
            <section>
              <h2 className="text-xl font-bold mb-4">Availability</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teacher.availability && teacher.availability.length > 0 ? (
                  teacher.availability.map((a) => (
                    <div key={a.day} className="p-4 rounded-lg bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold">{a.day}</div>
                        <div className="text-sm text-gray-500">{a.hour.length} slots</div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {a.hour.slice(0, 8).map((t, i) => (
                          <span key={i} className="px-2 py-1 rounded bg-white border text-sm">{t}</span>
                        ))}
                        {a.hour.length > 8 && <span className="px-2 py-1 rounded bg-gray-100 text-sm">+{a.hour.length - 8} more</span>}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500">No availability data</div>
                )}
              </div>
            </section>
          )}

          {activeTab === "booking" && (
            <section>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* left/main: weekly grid + summary */}
                <div className="lg:col-span-2">
                  <WeeklyBookingGrid
                    availability={teacher.availability}
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                    onSelect={(d, t) => {
                      setSelectedDate(d);
                      setSelectedTime(t);
                    }}
                  />

                  {/* compact summary under grid for mobile */}
                  <div className="mt-6 p-4 rounded-lg bg-blue-50 border border-blue-100 lg:hidden">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-600">Teacher</div>
                        <div className="font-medium">{teacher.name}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Rate</div>
                        <div className="font-semibold">{formatCurrency(teacher.hourly_price)}</div>
                      </div>
                    </div>

                    <div className="mt-4 text-sm text-gray-700">
                      <div><strong>Date:</strong> {selectedDate ? new Date(selectedDate).toLocaleDateString() : "—"}</div>
                      <div><strong>Time:</strong> {selectedTime || "—"}</div>
                      <div><strong>Duration:</strong> 1 hour</div>
                    </div>
                  </div>
                </div>

                {/* right: order summary (sticky) */}
                <div className="lg:col-span-1">
                  <div className="sticky top-6 p-4 rounded-lg bg-gradient-to-br from-primary-color-P1 to-primary-color-P2 text-white shadow">
                    <div className="font-semibold mb-4">Order Summary</div>

                    <div className="flex justify-between text-sm mb-2">
                      <span>Lesson Fee</span>
                      <span>{formatCurrency(teacher.hourly_price)}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-4">
                      <span>Duration</span>
                      <span>1 hour</span>
                    </div>

                    <div className="border-t border-white/30 pt-3 flex justify-between font-bold text-lg mb-4">
                      <span>Total</span>
                      <span>{formatCurrency(teacher.hourly_price)}</span>
                    </div>

                    {selectedDate && selectedTime ? (
                      <div>
                        <PayPalPayment
                          amount={teacher.hourly_price}
                          description={`Lesson with ${teacher.name} on ${selectedDate} at ${selectedTime}`}
                          onSuccess={handlePaymentSuccess}
                        />

                        {bookingStatus === "processing" && (
                          <div className="mt-3 bg-yellow-400 text-yellow-900 rounded-lg p-3 text-sm text-center font-semibold">Processing...</div>
                        )}
                        {bookingStatus === "success" && (
                          <div className="mt-3 bg-green-50 text-green-800 rounded-lg p-3 text-sm text-center font-semibold">Booking confirmed — redirecting…</div>
                        )}
                        {bookingStatus === "error" && (
                          <div className="mt-3 bg-red-50 text-red-800 rounded-lg p-3 text-sm text-center font-semibold">Failed to save booking. Try again.</div>
                        )}
                      </div>
                    ) : (
                      <div className="mt-2 p-3 bg-white/20 rounded text-center text-sm">Select date & time to continue</div>
                    )}
                  </div>

                  <Link href={`/teachers/${teacherId}/message`} className="block mt-3 text-center text-sm text-primary-color-P4 hover:underline">Message teacher</Link>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
