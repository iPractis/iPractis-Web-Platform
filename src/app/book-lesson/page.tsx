import { Suspense } from "react";
import BookLessonClient from "./BookLessonClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Loading booking page…</div>}>
      <BookLessonClient />
    </Suspense>
  );
}
