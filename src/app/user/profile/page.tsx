"use client";

import React, { useEffect, useState } from "react";

type UserDataProps = {
  email: string;
};

const ProfilePage = () => {
  const [userData, setUserData] = useState<UserDataProps | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      console.log("frontend token from localStorage: ", token);
      if (!token) {
        setError("No token found, please log in first");
        return;
      }

      const response = await fetch("/api/user/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(typeof data);
        setUserData(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  console.log("UserData: ", userData);

  return (
    <section className="flex flex-col items-center">
      <h2>User bio</h2>
      <p>Email: {userData.email}</p>
      {/* Render other user data as needed */}
    </section>
  );
};

export default ProfilePage;
