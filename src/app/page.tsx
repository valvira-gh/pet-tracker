"use client";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import Link from "next/link";

type UserDataProps = {
  id: number;
  secretId: string;
  email: string;
  isLogged: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: React.ReactNode;
  lastLogout: React.ReactNode;
  profile: {
    profileId: number;
    userId: string;
    firstName: string;
    lastName: string;
  };
};

type NextResponseBody = {
  message: string;
  userData: UserDataProps;
  id: number;
  email: string;
  isLogged: boolean;
  lastLogin: string | React.ReactNode;
  lastLogout: string | React.ReactNode;
};

const Home: React.FC = () => {
  const [userData, setUserData] = useState<UserDataProps | null>(null);
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
        console.log("Data: ", data);
        setUserData(data);
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
          {userData ? (
            <UserLoggedIn
              userData={userData}
              message={message}
              id={userData.id}
              email={userData.email}
              isLogged={userData.isLogged}
              lastLogin={userData.lastLogin}
              lastLogout={userData.lastLogout}
            />
          ) : (
            <UserNotLoggedIn />
          )}
        </Card>
      ) : (
        <p className="text-xl font-mono">Loading user...</p>
      )}
    </section>
  );
};

export default Home;

export const UserLoggedIn: React.FC<NextResponseBody> = ({ userData }) => {
  return (
    <div className="">
      <h3 className="text-xl">Olet kirjautunut sisään käyttäjällä:</h3>
      <h3 className="text-xl text-center mt-1 text-blue-700 font-bold font-mono">
        {userData?.email}
      </h3>
      <p className="text-lg text-center mt-1">
        Olet viimeksi sisäänkirjautunut:{" "}
        <span className="text-blue-500 font-bold"> {userData?.lastLogin}</span>
      </p>
    </div>
  );
};

export const UserNotLoggedIn = () => {
  return (
    <div className="flex flex-col items-center w-4/4">
      <h2 className="text-2xl text-center">
        Et ole vielä kirjautunut sisään.
      </h2>
      <p className="m-2 w-full text-center">
        Sinun tulee ensin kirjautua sisään, jotta voit käyttää sovelluksen toimintoja.
      </p>

      <Link className="text-xl font-bold text-blue-500" href={"/login"}>
        Kirjaudu sisään
      </Link>
    </div>
  );
};
