"use client";

import { useEffect, useState } from "react";
import { TabBody } from "./TabBody";
import { fetchUserData } from "@/src/lib/fetchUserData";

export const ProfileSettings = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchUserData();
        setUserData(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load user data");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  if (loading) {
    return <div className="p-6 text-sm text-gray-500">Loading profile…</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-sm text-red-500">
        {error}
      </div>
    );
  }

  return <TabBody userData={userData} />;
};
