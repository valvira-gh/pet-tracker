"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type UserDataProps = {
  id: number;
  secretId: string;
  email: string;
  profile: {
    profileId: number;
    userId: string;
    firstName: string;
    lastName: string;
  };
};

const ProfilePage = () => {
  const [userData, setUserData] = useState<UserDataProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string>("");

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("First name: ", firstName);
    const token = localStorage.getItem("token");
    console.log("Getted token: ", token);

    if (!token) {
      setError("No token found, please log in first.");
      return;
    }

    const response = await fetch(`/api/user/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ firstName }),
    });

    if (response.ok) {
      const updatedProfile = await response.json();
      console.log("Updated profile: ", updatedProfile);

      setUserData((prevData) =>
        prevData
          ? {
              ...prevData,
              profile: updatedProfile.profile,
            }
          : null
      );
    } else {
      const errorData = await response.json();
      setError(errorData.message);
    }
  };

  return (
    <section className="flex flex-col items-center">
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="firstName"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Button type="submit">Submit</Button>
      </form>

      <h2 className="text-xl">User Profile</h2>
      <p className="">
        ID:
        <span className="font-bold"> {userData.id}</span>
      </p>
      <p className="">
        SecretID:
        <span className="font-bold"> {userData.secretId}</span>
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
        </>
      )}
      {/* Render other user data as needed */}
    </section>
  );
};

export default ProfilePage;
