//  app/actions/functions.ts
// Fetch institutes with authentication
"use server"
export const getInstitutes = async () => {
  try {
    const res = await fetch("/api/institutes", {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status} ${res.statusText}`);
    }
    const institutes = await res.json();
    return institutes;
    //   setInstitutes(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error("Failed to fetch institutes:", err);
  }
};
