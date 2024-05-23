// components/UserProfile.tsx
"use client";

import { useState, useEffect } from "react";

interface ProfileDataTypes {
  id: number;
  userEmail: string;
  firstName?: string;
  lastName?: string;
  age?: number;
  sex?: string;
}

type UserDataTypes = {
  id: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  profile?: ProfileDataTypes | null;
};

const UserProfile = ({ id }: { id: string }) => {
  const [userData, setUserData] = useState<UserDataTypes | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}/api/user/${id}`);
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
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <section className="flex flex-col items-center border p-4 border:border bg-card m-4">
      <h2 className="text-xl">User Profile</h2>
      <p className="">
        ID:
        <span className="font-bold"> {userData.id}</span>
      </p>
      <p className="">
        Email:
        <span className="font-bold"> {userData.email}</span>
      </p>
      {userData.profile && (
        <>
          <h3 className="text-lg">Profile Details</h3>
          <p className="">
            First Name:
            <span className="font-bold">
              {" "}
              {userData.profile.firstName || "N/A"}
            </span>
          </p>
          <p className="">
            Last Name:
            <span className="font-bold">
              {" "}
              {userData.profile.lastName || "N/A"}
            </span>
          </p>
          <p className="">
            Age:
            <span className="font-bold"> {userData.profile.age || "N/A"}</span>
          </p>
          <p className="">
            Sex:
            <span className="font-bold"> {userData.profile.sex || "N/A"}</span>
          </p>
        </>
      )}
    </section>
  );
};

export default UserProfile;
