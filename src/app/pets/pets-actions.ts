export const fetchUserData = async (token: string | null) => {
  // get token

  if (!token) {
    return "Token ei ole localStoragessa.";
  }

  const response = await fetch("/api/user/profile", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    const data = await response.json();
    console.log("UserData: ", data);
    return data;
  }
};
