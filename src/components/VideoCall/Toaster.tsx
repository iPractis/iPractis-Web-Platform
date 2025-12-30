"use client";

import React from "react";


export default function Toaster({ toasts, removeToast }) {
  return (
    <div className="fixed right-4 bottom-6 z-[9999] flex flex-col gap-3 items-end">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="bg-black/80 text-white px-4 py-2 rounded-lg shadow-md backdrop-blur-sm border border-white/10 max-w-xs transform transition-all duration-250 ease-out"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm">{t.message}</div>
            <button className="text-xs opacity-70 hover:opacity-100" onClick={() => removeToast(t.id)}>✕</button>
          </div>
        </div>
      ))}
    </div>
  );
}
