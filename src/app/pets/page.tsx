"use client";
import { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { PrismaClient } from "@prisma/client";
// types
import { UserData, PetData } from "@/lib/types";
// actions
import { fetchUserData } from "./pets-actions";
// components
import PetModal from "@/components/pet-modal";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const PetCard: React.FC<{
  pet: PetData;
  onClick: (id: PetData["id"]) => void;
}> = ({ pet, onClick }) => (
  <Card
    key={pet.id}
    className="border-2 border-pink-300 bg-card flex flex-col items-center justify-center p-4 cursor-pointer"
    onClick={() => onClick(pet.id)}
  >
    <CardHeader>
      <CardTitle className="text-card-foreground ">{pet.name}</CardTitle>
    </CardHeader>
  </Card>
);

const PetsPage: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [petData, setPetData] = useState<PetData[] | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [progressMessage, setProgressMessage] = useState<string>(
    "Tarkistetaan käyttäjää"
  );
  const [percent, setPercent] = useState<string>("0%");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedPet, setSelectedPet] = useState<PetData | null>(null);

  const handleCardClick = (id: PetData["id"]) => {
    const pet = petData?.find((pet) => pet.id === id);
    if (pet) {
      setSelectedPet(pet);
      setModalOpen(true);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      setProgress(33);
      const user = await fetchUserData(token);
      console.log("Data from fetchUserData: ", user);
      setUserData(user);

      fetchPetData(user.userId);
    };

    // const fetchUserData = async () => {
    //   // progress timer

    //   const token = localStorage.getItem("token");
    //   console.log("fetched token from lS: ", token);

    //   if (!token) {
    //     setMessage(
    //       "JWT-tokenia ei löytynyt localStoragesta, kirjaudu sisään luodaksesi session."
    //     );
    //     return;
    //   }

    //   setProgress(22);

    //   const response = await fetch("/api/user/profile", {
    //     method: "GET",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });

    //   if (response.ok) {
    //     const data = await response.json();
    //     console.log("Data from fetchUserData: ", data);
    //     setUserData(data);
    //     fetchPetData(data.userId);
    //     setProgress(66);
    //   } else {
    //     const errorData = await response.json().catch(() => null);
    //     setMessage(errorData ? errorData.message : "Unknown error occurred");
    //   }
    // };

    const fetchPetData = async (userId: string) => {
      const response = await fetch(`/api/user/${userId}/pets`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Data from fetchPetData: ", data);
        setPetData(data);
        fetchCatData();
      } else {
        const errorData = await response.json().catch(() => null);
        setMessage(errorData ? errorData.message : "Unknown error occurred");
      }
      setProgress(100);
    };

    const fetchCatData = async () => {
      const pet = await prisma.pet.findUnique({
        where: {
          id: 1,
        },
        include: {
          cat: true,
        },
      });

      console.log(
        `Fetched pet: ${pet?.name} ID: ${pet?.id}\n related cat: ${pet?.cat}`
      );
    };

    fetchUser();
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 m-4 w-full">
                {petData.map((pet) => (
                  <PetCard key={pet.id} pet={pet} onClick={handleCardClick} />
                ))}
              </div>

              {/* Modal */}
              <PetModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                pet={selectedPet}
              />
            </>
          )}
        </>
      )}
    </section>
  );
};

export default PetsPage;
