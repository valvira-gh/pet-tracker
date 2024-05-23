"use client";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

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

const Home: React.FC = () => {
  const [data, setData] = useState<UserDataProps | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      // Haetaan token, jotta tiedetään onko käyttäjä kirjautunut sisään
      const token = localStorage.getItem("token");
      console.log("Token: ", token);

      if (!token) {
        setMessage("Please log in for your user to use the app.");
        return;
      }

      // Lähetetään HTTP-pyyntö backendiin, jonka headerina käytetään
      // token-arvoa yksilöimään käyttäjä, jotta saadaan 'isLogged'-arvo.
      const response = await fetch("/api/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer: ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setData(data);
        setMessage(`Olet kirjautunut sisään käyttäjällä: `);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message);
      }
    };

    fetchUserData();
  }, []);

  return (
    <section className="mt-4">
      {message ? (
        <Card className="p-4 flex flex-col items-center justify-center">
          <h3 className="text-xl">Olet kirjautunut sisään käyttäjällä:</h3>
          <h3 className="text-xl mt-1 text-blue-700 font-bold font-mono">
            {data?.email}
          </h3>
        </Card>
      ) : (
        <p className="text-xl font-mono">Loading user...</p>
      )}
    </section>
  );
};

export default Home;
