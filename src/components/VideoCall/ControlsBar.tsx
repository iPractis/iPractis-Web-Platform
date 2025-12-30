"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  MonitorUp,
  MonitorX,
  PhoneOff,
  ChevronDown,
} from "lucide-react";

export default function ControlsBar({
  isMuted,
  isCameraOff,
  isScreenSharing,
  toggleMic,
  toggleCamera,
  toggleScreenShare,
  leaveRoom,
}) {
  const [visible, setVisible] = useState(true);
  const idleTimer = useRef(null);

  useEffect(() => {
    const handle = () => {
      setVisible(true);
      clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setVisible(false), 3500);
    };

    window.addEventListener("mousemove", handle);
    window.addEventListener("click", handle);
    window.addEventListener("keydown", handle);

    handle();

    return () => {
      window.removeEventListener("mousemove", handle);
      window.removeEventListener("click", handle);
      window.removeEventListener("keydown", handle);
    };
  }, []);

  /* ----------------------------------------
     Styles (scaled up)
  ---------------------------------------- */

  // Pill container (bigger + thicker)
  const pill =
    "flex items-center justify-center bg-black/90 rounded-full px-4 py-2 shadow-lg backdrop-blur-md transition hover:bg-black";

  // Icon bubble (bigger)
  const circle =
    "flex items-center justify-center w-10 h-10 rounded-full bg-white text-black";

  // Chevron
  const chevron = "ml-2 text-white/70";

  return (
    <div
      className={`fixed bottom-6 left-6 z-50 flex items-center gap-3 transition-all duration-500
        ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
    >
      {/* Mic */}
      <button onClick={toggleMic} className={pill}>
        <div className={circle}>
          {isMuted ? <MicOff size={22} /> : <Mic size={22} />}
        </div>
        <ChevronDown size={18} className={chevron} />
      </button>

      {/* Camera */}
      <button onClick={toggleCamera} className={pill}>
        <div className={circle}>
          {isCameraOff ? <VideoOff size={22} /> : <Video size={22} />}
        </div>
        <ChevronDown size={18} className={chevron} />
      </button>

      {/* Screen Share */}
      <button onClick={toggleScreenShare} className={pill}>
        <div className={circle}>
          {isScreenSharing ? (
            <MonitorX size={22} />
          ) : (
            <MonitorUp size={22} />
          )}
        </div>
        <ChevronDown size={18} className={chevron} />
      </button>

      {/* End Call */}
      <button
        onClick={leaveRoom}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-xl ml-3"
      >
        <PhoneOff size={22} />
      </button>
    </div>
  );
}
