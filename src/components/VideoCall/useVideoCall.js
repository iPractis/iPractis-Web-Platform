"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useSearchParams, useParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export function useVideoCall(opts = {}) {
  const searchParams = useSearchParams();
  const params = useParams();

  const [roomId, setRoomId] = useState(null);
  const [joined, setJoined] = useState(false);
  const [peers, setPeers] = useState({}); // { peerId: MediaStream }
  const [localStream, setLocalStream] = useState(null);

  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [peerCameras, setPeerCameras] = useState({}); // { peerId: boolean }

  const localVideoRef = useRef(null);
  const peerConnections = useRef({}); // { peerId: RTCPeerConnection }
  const peerId = useRef(uuidv4());
  const channelRef = useRef(null);

  const makingOffer = useRef(false);
  const isPolite = (remoteId) => peerId.current > remoteId;

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  // -------------------------
  // Helpers: safe attach/play
  // -------------------------
  const safeAttachLocal = useCallback((stream) => {
    if (!stream) return;
    const el = localVideoRef.current;
    if (!el) return;
    try {
      if (el.srcObject !== stream) {
        el.srcObject = stream;
      }
      // play, but swallow autoplay errors
      el.play?.().catch(() => {});
    } catch (err) {
      console.warn("safeAttachLocal error:", err);
    }
  }, []);

  const safeAttachRemote = useCallback((el, stream) => {
    if (!el) return;
    try {
      if (el.srcObject !== stream) {
        el.srcObject = stream;
      }
      el.play?.().catch(() => {});
    } catch (err) {
      console.warn("safeAttachRemote error:", err);
    }
  }, []);

  // -------------------------
  // Room id from query/path
  // -------------------------
  useEffect(() => {
    const fromQuery = searchParams?.get?.("room");
    const fromPath = params?.roomId;
    const id = fromQuery || fromPath;
    if (id) setRoomId(id);
  }, [searchParams, params]);

  // -------------------------
  // Local media setup
  // -------------------------
  const setupLocalStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
        audio: true,
      });

      setLocalStream(stream);
      // attach only if ref exists (VideoGrid keeps it mounted)
      safeAttachLocal(stream);
      return stream;
    } catch (err) {
      console.error("getUserMedia error:", err);
      alert("Please allow camera and microphone access.");
      return null;
    }
  };

  // -------------------------
  // ICE servers
  // -------------------------
  const getIceServers = () => [
    { urls: "stun:stun.l.google.com:19302" },
    {
      urls: "turn:relay.metered.ca:80",
      username: "openai",
      credential: "openai123",
    },
  ];

  // -------------------------
  // Create peer connection
  // -------------------------
  const createPeerConnection = (targetId, stream) => {
    const pc = new RTCPeerConnection({ iceServers: getIceServers() });

    // Add tracks from the provided stream (if any)
    try {
      if (stream && stream.getTracks) {
        stream.getTracks().forEach((t) => pc.addTrack(t, stream));
      }
    } catch (err) {
      console.warn("createPeerConnection addTrack error:", err);
    }

    pc.ontrack = (event) => {
      const [remoteStream] = event.streams;
      if (remoteStream) {
        setPeers((prev) => ({ ...prev, [targetId]: remoteStream }));
      }
    };

    pc.onicecandidate = (event) => {
      if (event?.candidate) {
        safeSendSignal({
          type: "ice-candidate",
          from: peerId.current,
          to: targetId,
          candidate: event.candidate,
        });
      }
    };

    pc.onnegotiationneeded = async () => {
      if (makingOffer.current || pc.signalingState !== "stable") return;
      await negotiate(pc, targetId);
    };

    peerConnections.current[targetId] = pc;
    return pc;
  };

  // -------------------------
  // Negotiation helpers
  // -------------------------
  const negotiate = async (pc, remoteId) => {
    if (!pc) return;
    if (pc.signalingState !== "stable") return;
    try {
      makingOffer.current = true;
      const offer = await pc.createOffer();
      if (pc.signalingState !== "stable") return;
      await pc.setLocalDescription(offer);
      safeSendSignal({
        type: "offer",
        from: peerId.current,
        to: remoteId,
        sdp: pc.localDescription,
      });
    } catch (err) {
      console.error("negotiation error:", err);
    } finally {
      makingOffer.current = false;
    }
  };

  // -------------------------
  // Safe channel send
  // -------------------------
  const safeSendSignal = async (data) => {
    try {
      if (!channelRef.current || !channelRef.current.send) return;
      await channelRef.current.send({
        type: "broadcast",
        event: "signal",
        payload: JSON.stringify(data),
      });
    } catch (err) {
      console.warn("safeSendSignal failed:", err);
    }
  };

  // -------------------------
  // Join room
  // -------------------------
  const joinRoom = async () => {
    if (!roomId) return alert("No Room ID found");
    if (joined) return;

    const stream = await setupLocalStream();
    if (!stream) return;

    // small random wait to reduce collisions
    await wait(200 + Math.random() * 200);

    try {
      const channel = supabase.channel(roomId, {
        config: { broadcast: { self: false } },
      });

      channelRef.current = channel;

      channel.on("broadcast", { event: "signal" }, async ({ payload }) => {
        let msg;
        try {
          msg = JSON.parse(payload);
        } catch (e) {
          return;
        }
        if (!msg || msg.from === peerId.current) return;
        if (msg.to && msg.to !== peerId.current) return;

        switch (msg.type) {
          case "join": {
            // remote announced itself -> create pc and negotiate
            const pc = createPeerConnection(msg.from, stream);
            await negotiate(pc, msg.from);
            try { opts?.onUserJoin?.(msg.from); } catch (e) { console.warn(e); }
            break;
          }

          case "offer": {
            const remoteId = msg.from;
            const polite = isPolite(remoteId);
            const pc =
              peerConnections.current[remoteId] ||
              createPeerConnection(remoteId, stream);

            const offerCollision =
              makingOffer.current || pc.signalingState !== "stable";

            if (offerCollision) {
              if (polite) {
                try {
                  await pc.setLocalDescription({ type: "rollback" });
                  await pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
                } catch (e) {
                  console.warn("offer collision handling failed", e);
                }
              }
              return;
            }

            try {
              await pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
              const answer = await pc.createAnswer();
              await pc.setLocalDescription(answer);
              safeSendSignal({
                type: "answer",
                from: peerId.current,
                to: remoteId,
                sdp: pc.localDescription,
              });
            } catch (err) {
              console.error("handling offer error:", err);
            }
            break;
          }

          case "answer": {
            const pc = peerConnections.current[msg.from];
            if (!pc) return;
            try {
              await pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
            } catch (err) {
              console.warn("setRemoteDescription(answer) failed:", err);
            }
            break;
          }

          case "ice-candidate": {
            const pc = peerConnections.current[msg.from];
            if (pc && msg.candidate) {
              try {
                await pc.addIceCandidate(new RTCIceCandidate(msg.candidate));
              } catch (err) {
                console.warn("addIceCandidate failed:", err);
              }
            }
            break;
          }

          case "leave": {
            const pc = peerConnections.current[msg.from];
            if (pc) try { pc.close(); } catch(e){}

            delete peerConnections.current[msg.from];

            setPeers((prev) => {
              const u = { ...prev };
              delete u[msg.from];
              return u;
            });
            try { opts?.onUserLeave?.(msg.from); } catch (e) { console.warn(e); }
            break;
          }

          case "camera-state": {
            setPeerCameras((prev) => ({ ...prev, [msg.from]: msg.cameraOn }));
            break;
          }
        }
      });

      await channel.subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          setJoined(true);
          await wait(100);
          safeSendSignal({ type: "join", from: peerId.current });
        }
      });
    } catch (err) {
      console.error("joinRoom error:", err);
    }
  };

  // Auto-join when roomId is set
  useEffect(() => {
    if (roomId && !joined) joinRoom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  // -------------------------
  // Leave room & cleanup
  // -------------------------
  const leaveRoom = async () => {
    try {
      // stop local tracks
      localStream?.getTracks()?.forEach((t) => {
        try { t.stop(); } catch (e) {}
      });

      // close all peer connections
      Object.values(peerConnections.current).forEach((pc) => {
        try { pc.close(); } catch (e) {}
      });
      peerConnections.current = {};

      // notify peers
      safeSendSignal({ type: "leave", from: peerId.current });

      // unsubscribe channel if present
      try {
        if (channelRef.current?.unsubscribe) {
          await channelRef.current.unsubscribe();
        }
      } catch (e) {
        console.warn("channel unsubscribe failed", e);
      }

      setJoined(false);
      setPeers({});
      setLocalStream(null);

      if (localVideoRef.current) {
        try { localVideoRef.current.srcObject = null; } catch (e) {}
      }
    } catch (e) {
      console.error("leaveRoom error:", e);
    }
  };

  // -------------------------
  // Microphone toggle
  // -------------------------
  const toggleMic = () => {
    if (!localStream) return;
    const track = localStream.getAudioTracks()[0];
    if (!track) return;
    track.enabled = !track.enabled;
    setIsMuted(!track.enabled);
  };

  // -------------------------
  // Camera toggle (safe)
  // -------------------------
  const toggleCamera = async () => {
    if (!localStream) return;

    if (!isCameraOff) {
      // turn off camera
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        try {
          videoTrack.stop();
        } catch (e) {}
        try {
          localStream.removeTrack(videoTrack);
        } catch (e) {}
      }

      // inform peers
      safeSendSignal({ type: "camera-state", from: peerId.current, cameraOn: false });

      // ensure local preview cleared safely
      if (localVideoRef.current) {
        try { localVideoRef.current.srcObject = null; } catch (e) {}
      }

      setIsCameraOff(true);
      setLocalStream((prev) => {
        // local stream now contains only audio (if any)
        return new MediaStream(prev?.getAudioTracks?.() || []);
      });
    } else {
      // re-enable camera
      try {
        const newStream = await navigator.mediaDevices.getUserMedia({ video: true });
        const newVideoTrack = newStream.getVideoTracks()[0];
        const audioTracks = localStream?.getAudioTracks?.() || [];

        // create combined stream
        const combined = new MediaStream([...audioTracks, newVideoTrack]);

        setLocalStream(combined);
        // attach safely
        safeAttachLocal(combined);

        // update each peer's sender
        for (const [id, pc] of Object.entries(peerConnections.current)) {
          try {
            const sender = pc.getSenders().find((s) => s.track?.kind === "video");
            if (sender) {
              await sender.replaceTrack(newVideoTrack);
            } else {
              pc.addTrack(newVideoTrack, combined);
            }
            await negotiate(pc, id);
          } catch (err) {
            console.warn("replaceTrack error for", id, err);
          }
        }

        safeSendSignal({ type: "camera-state", from: peerId.current, cameraOn: true });
        setIsCameraOff(false);
      } catch (err) {
        console.error("toggleCamera enable failed:", err);
        alert("Could not access camera. Please allow permissions.");
      }
    }
  };

  // -------------------------
  // Screen share toggle (safe)
  // -------------------------
  // ------------------------------------------------------------
// Screen Share (SAFE + SILENT)
// ------------------------------------------------------------
const toggleScreenShare = async () => {
  try {
    // STOP SCREEN SHARE → revert to camera
    if (isScreenSharing) {
      const cameraTrack = localStream?.getVideoTracks?.()[0];

      for (const pc of Object.values(peerConnections.current)) {
        const sender = pc.getSenders().find((s) => s.track?.kind === "video");
        if (sender && cameraTrack) await sender.replaceTrack(cameraTrack);
      }

      if (localVideoRef.current && localStream) {
        try {
          localVideoRef.current.srcObject = localStream;
          localVideoRef.current.play?.().catch(() => {});
        } catch {}
      }

      setIsScreenSharing(false);
      return;
    }

    // START SCREEN SHARING
    let screenStream;
    try {
      screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });
    } catch (err) {
      // 🔥 Silent fail — do NOT break UI
      console.warn("Screen share denied or cancelled:", err);
      // Optionally: show toast instead of crashing
      // opts?.onScreenShareDenied?.();
      return;
    }

    const screenTrack = screenStream.getVideoTracks()[0];

    // When user clicks "Stop sharing" in browser UI
    screenTrack.onended = () => {
      toggleScreenShare(); // auto revert to camera
    };

    // Replace outgoing video track for all peers
    for (const pc of Object.values(peerConnections.current)) {
      const sender = pc.getSenders().find((s) => s.track?.kind === "video");
      if (sender) await sender.replaceTrack(screenTrack);
    }

    // Update local preview
    if (localVideoRef.current) {
      try {
        localVideoRef.current.srcObject = screenStream;
        localVideoRef.current.play?.().catch(() => {});
      } catch {}
    }

    setIsScreenSharing(true);
  } catch (err) {
    // 🔥 Failsafe — never crash UI
    console.warn("toggleScreenShare unexpected error:", err);
  }
};


  // -------------------------
  // Sync local stream effect
  // -------------------------
  useEffect(() => {
    if (localStream) {
      safeAttachLocal(localStream);
    }
  }, [localStream, safeAttachLocal]);

  // -------------------------
  // Retry loop (defensive)
  // -------------------------
  useEffect(() => {
    let tries = 0;
    const interval = setInterval(() => {
      tries++;
      if (!localStream) return;
      if (!localVideoRef.current) return;
      try {
        if (localVideoRef.current.srcObject !== localStream) {
          localVideoRef.current.srcObject = localStream;
          localVideoRef.current.play?.().catch(() => {});
        }
      } catch (e) {
        console.warn("retry attach error:", e);
      }
      if (tries > 10) clearInterval(interval);
    }, 500);
    return () => clearInterval(interval);
  }, [localStream]);

  // -------------------------
  // Cleanup on unmount
  // -------------------------
  useEffect(() => {
    return () => {
      try { localStream?.getTracks?.().forEach((t) => t.stop()); } catch (e) {}
      try { Object.values(peerConnections.current).forEach((pc) => pc.close()); } catch (e) {}
      try { channelRef.current?.unsubscribe?.(); } catch (e) {}
    };
  }, []);

  // -------------------------
  // Notify peers on unload
  // -------------------------
  useEffect(() => {
    const sendLeave = () => {
      try {
        if (channelRef.current?.send) {
          channelRef.current.send({
            type: "broadcast",
            event: "signal",
            payload: JSON.stringify({ type: "leave", from: peerId.current }),
          });
        }
      } catch (e) {
        // best effort
      }
    };

    window.addEventListener("beforeunload", sendLeave);
    window.addEventListener("pagehide", sendLeave);

    return () => {
      window.removeEventListener("beforeunload", sendLeave);
      window.removeEventListener("pagehide", sendLeave);
    };
  }, []);

  return {
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
  };
}
