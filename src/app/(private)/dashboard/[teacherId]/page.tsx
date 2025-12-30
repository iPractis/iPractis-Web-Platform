import React from 'react'
import LessonBookingCard from './LessonBookingCard'

function Page({ params }) {
  const { teacherId } = params;
console.log(teacherId)
  return (
    <div>
      <LessonBookingCard teacherId={teacherId} />
    </div>
  );
}

export default Page;
