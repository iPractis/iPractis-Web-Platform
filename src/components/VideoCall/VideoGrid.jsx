"use client";

import React, { useCallback } from "react";
import { User } from "lucide-react";

/**
 * VideoGrid (robust)
 * - Local video element is ALWAYS mounted (prevents srcObject null errors)
 * - Remote main peer rendered as big fullscreen video (if present)
 * - Local preview switches between small floating or fullscreen fallback via CSS (no remount)
 * - Additional remote peers render as small tiles
 *
 * Props:
 *  - localVideoRef: ref object from useVideoCall (attached to the single local <video>)
 *  - peers: { peerId: MediaStream, ... }
 *  - peerCameras: { peerId: boolean }
 *  - isCameraOff: boolean (local camera off)
 */

export default function VideoGrid({ localVideoRef, peers, peerCameras, isCameraOff }) {
  const peerList = Object.entries(peers);

  const mainPeer = peerList.length > 0 ? peerList[0] : null;
  const extraPeers = peerList.slice(1);

  // Helper to safely attach remote streams to video elements
  const attachStream = useCallback((el, stream) => {
    if (!el) return;
    try {
      if (el.srcObject !== stream) {
        el.srcObject = stream;
        // try to play, but swallow errors (autoplay policy etc.)
        el.play?.().catch(() => {});
      }
    } catch (err) {
      // defensive: browsers may throw if element is not ready
      console.warn("attachStream error:", err);
    }
  }, []);

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      {/* ------------------ REMOTE MAIN (if any) ------------------ */}
      {mainPeer ? (
        <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden">
          { (peerCameras[mainPeer[0]] ?? true) ? (
            <video
              key={mainPeer[0]}
              autoPlay
              playsInline
              // remote video element is separate and always present while remote exists
              ref={(v) => {
                attachStream(v, mainPeer[1]);
              }}
className="object-contain w-full h-full bg-black"            />
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full text-gray-300 bg-black">
              <div className="bg-gray-700/40 rounded-full p-5 mb-3">
                <User size={42} className="opacity-80" />
              </div>
              <span className="text-base text-gray-300">Camera Off</span>
            </div>
          )}

          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-sm px-3 py-1.5 rounded-full">
            {mainPeer[0].slice(0, 5)}
          </div>
        </div>
      ) : (
        // If no remote, we still keep a full-screen fallback (local video will expand via CSS below)
        <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-black flex items-center justify-center">
          {/* This area will be covered by the local video element via CSS classes below (same element) */}
          {isCameraOff && (
            <div className="flex flex-col items-center justify-center w-full h-full text-gray-300">
              <div className="bg-gray-700/40 rounded-full p-5 mb-3">
                <User size={42} className="opacity-80" />
              </div>
              <span className="text-base text-gray-300">Camera Off</span>
            </div>
          )}
        </div>
      )}

      {/* ------------------ SINGLE LOCAL VIDEO (always mounted) ------------------ */}
      {/* When a remote exists, this is rendered as small floating preview.
          When no remote exists, CSS makes it fullscreen (fallback) so same element is reused. */}
      <div
        // wrapper positioned so we can easily change size/location via conditional classes
        className={`absolute transition-all duration-300 ${
          mainPeer ? "top-4 right-4 w-40 h-28" : "inset-0 w-full h-full"
        } z-[40]`}
        style={mainPeer ? {} : { display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <div
          className={`relative rounded-xl overflow-hidden border border-white/20 shadow-xl bg-black ${
            mainPeer ? "w-full h-full" : "w-full h-full"
          }`}
        >
          {/* Local video element is always in the DOM and uses the provided ref */}
          {!isCameraOff ? (
            <video
              ref={localVideoRef}
              muted
              autoPlay
              playsInline
              // adapt object-fit depending on whether it's preview or fullscreen
              className={`object-cover w-full h-full ${mainPeer ? "rounded-xl" : "rounded-none"}`}
            />
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full text-gray-300">
              <div className="bg-gray-700/40 rounded-full p-3 mb-2">
                <User size={28} className="opacity-80" />
              </div>
              <span className="text-xs text-gray-300">Camera Off</span>
            </div>
          )}

          <div className="absolute bottom-1 left-1 bg-black/60 px-2 py-0.5 text-[10px] rounded-full">
            You
          </div>
        </div>
      </div>

      {/* ------------------ EXTRA REMOTE PEERS (small tiles) ------------------ */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-4 z-30">
        {extraPeers.map(([id, stream]) => {
          const cameraOn = peerCameras[id] ?? true;

          return (
            <div
              key={id}
              className="relative w-40 h-28 bg-black rounded-xl overflow-hidden border border-white/20 shadow-xl"
            >
              {cameraOn ? (
                <video
                  autoPlay
                  playsInline
                  ref={(v) => attachStream(v, stream)}
className="object-contain w-full h-full bg-black"                />
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-full text-gray-300">
                  <div className="bg-gray-700/40 rounded-full p-3 mb-2">
                    <User size={28} className="opacity-80" />
                  </div>
                  <span className="text-xs text-gray-300">Camera Off</span>
                </div>
              )}

              <div className="absolute bottom-1 left-1 bg-black/60 px-2 py-0.5 text-[10px] rounded-full">
                {id.slice(0, 5)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
