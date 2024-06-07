"use client";
import { useState, useEffect } from "react";

type UserDataProps = {
  id: number;
  userId: string;
  email: string;
  profile: {
    id: number;
    userId: string;
    firstName: string;
    lastName: string;
  };
};

type PetDataProps = {
  id: number;
  referenceKey: string;
  species: string;
  ownerId: string;
  name: string;
  age?: string;
};

const PetsPage: React.FC = () => {
  const [userData, setUserData] = useState<UserDataProps | null>(null);
  const [petData, setPetData] = useState<PetDataProps[] | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      console.log("fetched token from lS: ", token);

      if (!token) {
        setMessage(
          "JWT-tokenia ei löytynyt localStoragesta, kirjaudu sisään luodaksesi session."
        );
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
        console.log("Data from fetchUserData: ", data);
        setUserData(data);
        fetchPetData(data.userId);
      } else {
        const errorData = await response.json().catch(() => null);
        setMessage(errorData ? errorData.message : "Unknown error occurred");
      }
    };

    const fetchPetData = async (userId: string) => {
      const response = await fetch(`/api/user/${userId}/pets`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Data from fetchPetData: ", data);
        setPetData(data);
      } else {
        const errorData = await response.json().catch(() => null);
        setMessage(errorData ? errorData.message : "Unknown error occurred");
      }
    };

    console.log(userData);

    fetchUserData();
  }, []);

  return (
    <section className="flex flex-col items-center mt-2">
      <h2 className="text-2xl text-center">Tervetuloa lemmikkisivulle!</h2>
      <p className="text-lg text-center">
        Täältä löydät kaikki lemmikkisi tiedot.
      </p>
      {message && <p className="text-red-500">{message}</p>}
      {petData && (
        <ul>
          {petData.map((pet) => (
            <li key={pet.id}>
              {pet.name} ({pet.species})
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default PetsPage;
