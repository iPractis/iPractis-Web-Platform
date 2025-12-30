"use client";

import {
  AddBGIcon,
  NewMessageIcon,
  NotificationIcon,
  WalletBgIcon,
} from "../../Icons";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import NavDropdown from "./NavDropdown";
import NavSearchBar from "./NavSearchBar";

import { useNotifications } from "@/src/hooks/useNotifications";
import { useAuth } from "@/src/hooks/useAuth";

// Images
import logo from "@/public/logos/ipractis-logo-1.png";
import NotificationDropdown from "../../Notifications/NotificationDropdown";

const NavDesktopTeacher = ({ userName }) => {
  // ------------------------------
  // 🔐 Auth
  // ------------------------------
  const { user } = useAuth();
  const userId = user?.userId; // ✅ SAFE ACCESS

  // ------------------------------
  // 💬 Unread chat messages
  // ------------------------------
  const [unreadMessages, setUnreadMessages] = useState(0);

  // ------------------------------
  // 🔔 Notification dropdown toggle
  // ------------------------------
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // ------------------------------
  // 🔔 Notifications (Realtime)
  // ------------------------------
  const {
    notifications,
    unreadCount: unreadNotifications,
    setNotifications,
  } = useNotifications(userId, {
    enabled: !!userId, // ✅ prevent hook firing without user
  });

  // ------------------------------
  // 🔥 Fetch unread message count
  // ------------------------------
  useEffect(() => {
    if (!userId) return;

    async function loadUnread() {
      try {
        const res = await fetch("/api/chat/unread", {
          credentials: "include",
        });
        const data = await res.json();
        setUnreadMessages(data.unreadCount || 0);
      } catch (err) {
        console.error("Unread message load error:", err);
      }
    }

    loadUnread();
    const timer = setInterval(loadUnread, 60_000); // 1 min
    return () => clearInterval(timer);
  }, [userId]);

  // ------------------------------
  // 🔢 Badge formatter
  // ------------------------------
  const formatBadge = (num) => {
    if (!num || num <= 0) return null;
    return num > 9 ? "9+" : num;
  };

  return (
    <div className="flex justify-between items-center gap-1.5">
      {/* ------------------------------ */}
      {/* Left Column — Logo */}
      {/* ------------------------------ */}
      <Link href="/">
        <Image
          className="w-[113px] p-1.5"
          alt="Logo iPractis"
          src={logo}
          priority
        />
      </Link>

      {/* ------------------------------ */}
      {/* Right Column */}
      {/* ------------------------------ */}
      <div className="flex items-center gap-4">
        <NavSearchBar />

        <div className="flex items-center relative">
          {/* 🔔 Notifications */}
          <div className="flex px-4 py-2 relative">
            <button
              className="relative"
              onClick={() => setIsNotifOpen((prev) => !prev)}
            >
              <NotificationIcon />

              {unreadNotifications > 0 && (
                <span
                  className="
                    absolute -top-1 -right-1 bg-red-500 text-white
                    text-[10px] h-4 min-w-4 px-1 rounded-full
                    flex items-center justify-center
                    border border-white
                    animate-pulse
                  "
                >
                  {formatBadge(unreadNotifications)}
                </span>
              )}
            </button>

            {isNotifOpen && (
              <NotificationDropdown
                notifications={notifications}
                setNotifications={setNotifications}
              />
            )}
          </div>

          {/* 💬 Messages — FIXED */}
          <div className="flex px-4 py-2">
            <Link href="/chat" className="relative">
              <NewMessageIcon fillcolor="fill-primary-color-P12" />

              {unreadMessages > 0 && (
                <span
                  className="
                    absolute -top-1 -right-1 bg-red-600 text-white
                    text-[10px] h-4 min-w-4 px-1 rounded-full
                    flex items-center justify-center
                    border border-white
                  "
                >
                  {formatBadge(unreadMessages)}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* ------------------------------ */}
        {/* Profile Dropdown */}
        {/* ------------------------------ */}
        <NavDropdown
          isDropdownHidden="lg:block hidden"
          userName={userName}
        />
      </div>
    </div>
  );
};

export default NavDesktopTeacher;
