"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const Layout = ({ children }) => {
  const { data: session, status } = useSession();
console.log(session, status, "LAYOUT SESSION");
  useEffect(() => {
    if (!session?.user?.token && status !== "loading") {

    }
  }, [status]);

  return children;
};

export default Layout;
