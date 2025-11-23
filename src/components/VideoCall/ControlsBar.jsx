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

    handle(); // start visible

    return () => {
      window.removeEventListener("mousemove", handle);
      window.removeEventListener("click", handle);
      window.removeEventListener("keydown", handle);
    };
  }, []);

  // Button shell
  const pill =
    "flex items-center justify-center bg-black/90 rounded-full px-2 py-1 shadow-md backdrop-blur-sm transition hover:bg-black";

  // Icon bubble
  const circle =
    "flex items-center justify-center w-7 h-7 rounded-full bg-white text-black";

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 flex items-center gap-2 transition-all duration-500
      ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}
    `}
    >
      {/* Mic */}
      <button onClick={toggleMic} className={pill}>
        <div className={circle}>
          {isMuted ? <MicOff size={16} /> : <Mic size={16} />}
        </div>
        <ChevronDown size={14} className="ml-1 text-white/70" />
      </button>

      {/* Camera */}
      <button onClick={toggleCamera} className={pill}>
        <div className={circle}>
          {isCameraOff ? <VideoOff size={16} /> : <Video size={16} />}
        </div>
        <ChevronDown size={14} className="ml-1 text-white/70" />
      </button>

      {/* Screen Share */}
      <button onClick={toggleScreenShare} className={pill}>
        <div className={circle}>
          {isScreenSharing ? <MonitorX size={16} /> : <MonitorUp size={16} />}
        </div>
        <ChevronDown size={14} className="ml-1 text-white/70" />
      </button>

      {/* Settings */}
      <button className={`${pill} px-2 py-2`}>
        <div className={circle}>⚙️</div>
      </button>

      {/* Chat */}
      <button className={`${pill} px-2 py-2`}>
        <div className={circle}>💬</div>
      </button>

      {/* End Call */}
      <button
        onClick={leaveRoom}
        className="flex items-center justify-center w-9 h-9 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg ml-2"
      >
        <PhoneOff size={16} />
      </button>
    </div>
  );
}
