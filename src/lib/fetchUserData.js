export async function fetchUserData() {
  const res = await fetch("/api/auth/me", {
    method: "GET",
    credentials: "include", // important for cookies
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user data");
  }

  return res.json();
}
