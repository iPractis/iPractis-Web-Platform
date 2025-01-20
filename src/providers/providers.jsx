"use client";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";
import axios from "axios";

axios.defaults.baseURL = process.env.BASE_URL;

export function Providers({ children, session }) {
  return (
    <SessionProvider session={session}>
      <UserConfiguration />

      <NextUIProvider>{children}</NextUIProvider>
    </SessionProvider>
  );
}

export const UserConfiguration = () => {
  const { data: session } = useSession();

  if (session?.user?.token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${session?.user?.token}`;
  }

  return <></>;
};
