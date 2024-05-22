// components/UserProfile.tsx
"use client";

import { useState, useEffect } from "react";

type UserDataTypes = {
  id: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
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
    <section className="flex flex-col items-center border p-4 border:border bg-card m-4">
      <h2 className="text-card-foreground">User Profile</h2>
      <p>ID: {userData.id}</p>
      <p>Email: {userData.email}</p>
      <p>Role: {userData.role}</p>

      <p>createdAt: {userData.createdAt}</p>
      <p>updatedAt: {userData.updatedAt}</p>
    </section>
  );
};

export default UserProfile;
