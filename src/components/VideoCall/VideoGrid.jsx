"use client";

import React, { useCallback } from "react";
import { User } from "lucide-react";

export default function VideoGrid({
  localVideoRef,
  peers,
  peerCameras,
  isCameraOff,
}) {
  const peerList = Object.entries(peers);
  const mainPeer = peerList.length > 0 ? peerList[0] : null;
  const extraPeers = peerList.slice(1);

  const attachStream = useCallback((el, stream) => {
    if (!el) return;
    if (el.srcObject !== stream) {
      el.srcObject = stream;
      el.play?.().catch(() => {});
    }
  }, []);

  return (
    <div className="relative w-full h-full bg-white overflow-hidden">
      {/* ---------- MAIN REMOTE ---------- */}
      {mainPeer ? (
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          {peerCameras[mainPeer[0]] ?? true ? (
            <video
              autoPlay
              playsInline
              ref={(v) => attachStream(v, mainPeer[1])}
              className="object-contain w-full h-full bg-black"
            />
          ) : (
            <CameraOff />
          )}

          <NameBadge>{mainPeer[0].slice(0, 5)}</NameBadge>
        </div>
      ) : (
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          {isCameraOff && <CameraOff />}
        </div>
      )}

      {/* ---------- LOCAL VIDEO (always mounted) ---------- */}
      <div
        className={`absolute transition-all duration-300 z-40 ${
          mainPeer
            ? "top-4 right-4 w-44 h-32" // slightly bigger preview
            : "inset-0 w-full h-full"
        }`}
      >
        <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/20 shadow-xl bg-black">
          {!isCameraOff ? (
            <video
              ref={localVideoRef}
              muted
              autoPlay
              playsInline
              className="object-contain w-full h-full bg-black"
            />
          ) : (
            <CameraOff small />
          )}

          <NameBadge>You</NameBadge>
        </div>
      </div>

      {/* ---------- EXTRA PEERS ---------- */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-4 z-30">
        {extraPeers.map(([id, stream]) => {
          const cameraOn = peerCameras[id] ?? true;

          return (
            <div
              key={id}
              className="relative w-44 h-32 rounded-xl overflow-hidden border border-white/20 shadow-xl bg-black"
            >
              {cameraOn ? (
                <video
                  autoPlay
                  playsInline
                  ref={(v) => attachStream(v, stream)}
                  className="object-contain w-full h-full bg-black"
                />
              ) : (
                <CameraOff small />
              )}

              <NameBadge>{id.slice(0, 5)}</NameBadge>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Small helpers ---------- */

function CameraOff({ small = false }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-gray-300">
      <div className="bg-gray-700/40 rounded-full p-4 mb-2">
        <User size={small ? 24 : 40} className="opacity-80" />
      </div>
      <span className={small ? "text-xs" : "text-base"}>Camera Off</span>
    </div>
  );
}

function NameBadge({ children }) {
  return (
    <div className="absolute bottom-2 left-2 bg-black/60 px-3 py-1 text-xs rounded-full">
      {children}
    </div>
  );
}
