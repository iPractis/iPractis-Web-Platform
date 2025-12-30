"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function TeacherDetailPage() {
  const params = useParams();
  const router = useRouter();
  const teacherId = params.id;

  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/teachers/${teacherId}`);
        if (!response.ok) throw new Error("Failed to fetch teacher details");
        const data = await response.json();
        setTeacher(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching teacher:", err);
      } finally {
        setLoading(false);
      }
    };

    if (teacherId) {
      fetchTeacher();
    }
  }, [teacherId]);

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time");
      return;
    }

    // Navigate to booking confirmation page with teacher and slot info
    router.push(
      `/book-lesson?teacherId=${teacherId}&date=${selectedDate}&time=${selectedTime}&amount=${teacher.hourlyRate}`
    );
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-primary-color-P1 to-white py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-color-P4"></div>
          <p className="text-gray-600 mt-4">Loading teacher details...</p>
        </div>
      </main>
    );
  }

  if (error || !teacher) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-primary-color-P1 to-white py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/browse-teachers"
            className="text-primary-color-P4 hover:underline mb-4 inline-block"
          >
            ← Back to Teachers
          </Link>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-800">
              Error: {error || "Teacher not found"}
            </p>
          </div>
        </div>
      </main>
    );
  }

  // Generate available time slots (example: 9 AM to 5 PM, 1-hour slots)
  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  // Generate next 7 days
  const getNextDays = () => {
    const days = [];
    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push(date.toISOString().split("T")[0]);
    }
    return days;
  };

  const availableDates = getNextDays();

  return (
    <main className="min-h-screen bg-gradient-to-b from-primary-color-P1 to-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/browse-teachers"
          className="text-primary-color-P4 hover:underline mb-6 inline-block"
        >
          ← Back to Teachers
        </Link>

        {/* Teacher Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
            {/* Profile Image */}
            <div className="md:col-span-1">
              <div className="relative h-64 bg-gradient-to-br from-primary-color-P1 to-primary-color-P2 rounded-lg overflow-hidden flex items-center justify-center">
                {teacher.profileImage ? (
                  <Image
                    src={teacher.profileImage}
                    alt={`${teacher.firstName} ${teacher.lastName}`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="text-white text-6xl font-bold">
                    {teacher.firstName?.charAt(0)}
                    {teacher.lastName?.charAt(0)}
                  </div>
                )}
              </div>
              <div className="mt-4 text-center">
                <p className="text-2xl font-bold text-primary-color-P4">
                  ${teacher.hourlyRate || 25}
                  <span className="text-sm font-normal text-gray-600">/hr</span>
                </p>
              </div>
            </div>

            {/* Teacher Info */}
            <div className="md:col-span-2">
              <h1 className="text-3xl font-bold text-primary-color-P1 mb-2">
                {teacher.firstName} {teacher.lastName}
              </h1>

              <p className="text-lg text-gray-600 mb-4">
                {teacher.profileTitle || "Professional Teacher"}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <span className="text-2xl">★</span>
                <span className="text-xl font-semibold text-gray-800">
                  {teacher.rating || "New"}
                </span>
                <span className="text-gray-500">
                  ({teacher.reviewCount || 0} reviews)
                </span>
              </div>

              {/* About */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-primary-color-P1 mb-2">
                  About
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {teacher.description ||
                    "Experienced teacher dedicated to helping students achieve their goals. Let's have a great learning experience together!"}
                </p>
              </div>

              {/* Subjects */}
              {teacher.subjects && teacher.subjects.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-primary-color-P1 mb-2">
                    Teaches
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {teacher.subjects.map((subject, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-primary-color-P11 text-primary-color-P4 rounded-full font-semibold text-sm"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Booking Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-primary-color-P1 mb-6">
            Book a Lesson
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Date Selection */}
            <div>
              <h3 className="text-lg font-bold text-primary-color-P1 mb-4">
                Select Date
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {availableDates.map((date) => {
                  const dateObj = new Date(date);
                  const dayName = dateObj.toLocaleDateString("en-US", {
                    weekday: "short",
                  });
                  const dayNum = dateObj.getDate();

                  return (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`px-4 py-3 rounded-lg font-semibold transition-colors ${
                        selectedDate === date
                          ? "bg-primary-color-P4 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <div className="text-sm">{dayName}</div>
                      <div className="text-lg">{dayNum}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Selection */}
            <div>
              <h3 className="text-lg font-bold text-primary-color-P1 mb-4">
                Select Time
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`px-3 py-2 rounded-lg font-semibold transition-colors ${
                      selectedTime === time
                        ? "bg-primary-color-P4 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Lesson Details */}
          {selectedDate && selectedTime && (
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-bold text-primary-color-P1 mb-2">
                Lesson Details
              </h3>
              <p className="text-gray-700">
                <strong>Date:</strong>{" "}
                {new Date(selectedDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-gray-700">
                <strong>Time:</strong> {selectedTime}
              </p>
              <p className="text-gray-700">
                <strong>Duration:</strong> 1 hour
              </p>
              <p className="text-lg font-bold text-primary-color-P4 mt-2">
                Total: ${teacher.hourlyRate || 25}
              </p>
            </div>
          )}

          {/* Book Button */}
          <button
            onClick={handleBooking}
            disabled={!selectedDate || !selectedTime}
            className={`w-full mt-8 px-6 py-3 rounded-lg font-bold text-lg transition-colors ${
              selectedDate && selectedTime
                ? "bg-primary-color-P4 text-white hover:bg-primary-color-P3 cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {selectedDate && selectedTime
              ? "Proceed to Payment"
              : "Select Date and Time"}
          </button>
        </div>
      </div>
    </main>
  );
}
