"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/actions";

const LogOutPage = () => {
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const performLogout = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage(
          "Et ole ensinkään kirjautunut sisään - kuinka siis voisitkaan kirjautua ulos?"
        );
        return;
      }

      try {
        const response = await fetch("/api/logout", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setMessage(data.message || "Uloskirjautuminen onnistui.");
          await logoutUser(); // Poistetaan token paikallisesti
          setTimeout(() => {
            router.push("/user/auth"); // Ohjataan käyttäjä kirjautumissivulle
          }, 2000);
        } else {
          const errorData = await response.json();
          setMessage(errorData.message || "Uloskirjautuminen epäonnistui.");
        }
      } catch (error) {
        setMessage("Uloskirjautuminen epäonnistui. Yritä uudelleen myöhemmin.");
        console.error("Error during logout:", error);
      }
    };

    performLogout();
  }, [router]);

  return (
    <section className="flex flex-col items-center">
      <h3 className="text-xl">Log-out Page</h3>
      {message && <p>{message}</p>}
    </section>
  );
};

export default LogOutPage;
