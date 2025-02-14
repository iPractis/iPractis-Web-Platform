"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const Layout = ({ children }) => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.user?.token && status !== "loading") {
      redirect("/");
    }
  }, [status]);

  return children;
};

export default Layout;
