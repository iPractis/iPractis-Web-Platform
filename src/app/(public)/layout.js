"use client";

import { useAuth } from "@/src/hooks/useAuth";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const Layout = ({ children }) => {
  const { authenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && authenticated) {
      redirect("/dashboard");
    }
  }, [authenticated,loading]);

  return children;
};

export default Layout;
