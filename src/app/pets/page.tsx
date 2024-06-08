"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

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
  const [progress, setProgress] = useState<number>(0);
  const [progressMessage, setProgressMessage] = useState<string>(
    "Tarkistetaan käyttäjää"
  );
  const [percent, setPercent] = useState<string>("0%");

  useEffect(() => {
    const fetchUserData = async () => {
      // progress timer

      const token = localStorage.getItem("token");
      console.log("fetched token from lS: ", token);

      if (!token) {
        setMessage(
          "JWT-tokenia ei löytynyt localStoragesta, kirjaudu sisään luodaksesi session."
        );
        return;
      }

      setProgress(22);

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
        setProgress(66);
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
      setProgress(100);
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (progress === 33) {
      setPercent("33%");
      setProgressMessage("Haetaan käyttäjätietoja");
    }
    if (progress === 66) {
      setPercent("66%");
      setProgressMessage("Kutsutaan lemmikkejä");
    }
    if (progress === 100) {
      setPercent("100%");
      setProgressMessage("Kaikki on valmista! :)");
      const timer = setTimeout(() => setProgress(-1), 1000);
      return () => clearTimeout(timer);
    }
    if (progress === -1) {
      setProgressMessage("");
    }
  });

  return (
    <section className="flex flex-col items-center mt-1 text-foreground">
      {/* PROGRESS BAR */}
      {progress >= 0 && (
        <div className="w-[250px] flex flex-col items-center justify-center mt-10 border p-4 rounded">
          <p className="text-md font-bold font-mono">{progressMessage}</p>
          <Progress value={progress} className="w-[100%]" />
          <p className="text-md font-bold font-mono">{percent}</p>
        </div>
      )}

      {/* CONTENT RENDERS WHEN ALL DATA IS RETURNED, status 200 */}
      {progress === -1 && (
        <>
          {userData && (
            <div className="w-full border-b">
              <p className="text-md font-mono text-center mt-2 p-2 text-accent-foreground">
                Käyttäjä:{" "}
                <span className="text-blue-600 text-md font-mono font-bold">
                  {userData?.profile.firstName
                    ? userData?.profile.firstName
                    : userData?.email}
                </span>
              </p>
            </div>
          )}

          {/* Error message */}
          {message && <p className="text-destructive">{message}</p>}

          {/* Pet Cards */}
          {petData && (
            <>
              <h3 className="text-xl font-semibold mt-4">
                Rekisteröidyt lemmikit
              </h3>
              <ul className="m-4 border w-[200%] h-[500px] p-4 ">
                {petData.map((pet) => (
                  <li key={pet.id}>
                    <Card className="border-2 border-pink-300 bg-card flex flex-col items-center justify-center w-[30%]">
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
            </>
          )}
        </>
      )}
    </section>
  );
};

export default PetsPage;
