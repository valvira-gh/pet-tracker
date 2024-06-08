"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  refId: string;
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
    <section className="flex flex-col items-center mt-1 text-foreground">
      <div className="w-full border-b">
        <p className="text-lg text-center m-2 p-2">
          Tältä välilehdeltä voit lisätä ja seurata lemmikkiesi tietoja.
        </p>
        <p className="text-md font-mono text-center mt-2 p-2 text-accent-foreground">
          Käyttäjä:{" "}
          <span className="text-blue-600 text-md font-mono font-bold">
            {userData?.profile.firstName
              ? userData?.profile.firstName
              : userData?.email}
          </span>
        </p>
      </div>
      <h3 className="text-xl font-semibold mt-4">Lemmikit</h3>
      {message && <p className="text-destructive">{message}</p>}
      {petData && (
        <ul className="m-4 ">
          {petData.map((pet) => (
            <li key={pet.id}>
              <Card className="border-2 border-pink-300 bg-card">
                <CardHeader>
                  <CardTitle className="text-card-foreground ">
                    {pet.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-card-foreground">
                  <p className="font-semibold">
                    Ikä: {pet.age ? pet.age : "Ei tiedossa"}
                  </p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default PetsPage;
