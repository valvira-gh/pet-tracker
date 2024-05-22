// components/UserProfile.tsx
"use client";

import { useState, useEffect } from "react";

type UserDataTypes = {
  id: number;
  email: string;
};

const UserProfile = ({ slug }: { slug: string }) => {
  const [userData, setUserData] = useState<UserDataTypes | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}/api/user/${slug}`);
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          const errorData = await response.json();
          setError(errorData.message);
        }
      } catch (error) {
        setError("Failed to fetch user data.");
      }
    };

    fetchUserData();
  }, [slug]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <section className="flex flex-col items-center">
      <h2>User Profile</h2>
      <p>ID: {userData.id}</p>
      <p>Email: {userData.email}</p>
    </section>
  );
};

export default UserProfile;
