"use client";

import React, { useCallback, useState, useEffect } from "react";
import VideoGrid from "./VideoGrid";
import ControlsBar from "./ControlsBar";
import { useVideoCall } from "./useVideoCall";
import Toaster from "./Toaster";

export default function VideoCallContainer() {
  const [toasts, setToasts] = useState([]);
  const [layout, setLayout] = useState("speaker"); // 👈 NEW LAYOUT MODE ("speaker" | "grid")

  const addToast = useCallback((message, ttl = 4000) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    setToasts((s) => [...s, { id, message }]);
    setTimeout(() => setToasts((s) => s.filter((t) => t.id !== id)), ttl);
    return id;
  }, []);

  const removeToast = useCallback((id) => setToasts((s) => s.filter((t) => t.id !== id)), []);

  const {
    localVideoRef,
    peers,
    peerCameras,
    joined,
    roomId,
    isMuted,
    isCameraOff,
    isScreenSharing,
    joinRoom,
    leaveRoom,
    toggleMic,
    toggleCamera,
    toggleScreenShare,
  } = useVideoCall({
    onUserJoin: (id) => addToast(`User ${id.slice(0, 5)} joined`),
    onUserLeave: (id) => addToast(`User ${id.slice(0, 5)} left`),
  });

  useEffect(() => {
    if (joined) addToast("You joined the room");
  }, [joined]);

  return (
    <div className="h-screen w-screen bg-[#1b1c1e] text-white flex flex-col overflow-hidden">
      {!joined ? (
        <div className="flex flex-col items-center gap-6 p-6 text-center h-full justify-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">🎥 Group Video Call</h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Joining room: <span className="text-white font-medium">{roomId || "..."}</span>
          </p>
          <button
            onClick={joinRoom}
            className="bg-green-600 hover:bg-green-700 active:scale-95 transition px-6 py-3 rounded-full text-lg font-semibold shadow-lg"
          >
            Join Room
          </button>
        </div>
      ) : (
        <div className="relative flex flex-col h-full w-full overflow-hidden">
          
          {/* 🌟 MAIN VIDEO AREA */}
          <VideoGrid
            layout={layout}         // 👈 pass layout
            localVideoRef={localVideoRef}
            peers={peers}
            peerCameras={peerCameras}
            isCameraOff={isCameraOff}
          />

          {/* 🌟 CONTROLS */}
          <ControlsBar
            layout={layout}
            setLayout={setLayout}   // 👈 allow layout switching
            isMuted={isMuted}
            isCameraOff={isCameraOff}
            isScreenSharing={isScreenSharing}
            toggleMic={toggleMic}
            toggleCamera={toggleCamera}
            toggleScreenShare={toggleScreenShare}
            leaveRoom={leaveRoom}
          />
        </div>
      )}

      <Toaster toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
