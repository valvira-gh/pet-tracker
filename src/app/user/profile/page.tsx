import { getUsers } from "@/lib/actions";

const ProfilePage = async () => {
  const users = await getUsers();

  return (
    <section className="flex flex-col items-center">
      {users.map((user) => (
        <li key={user.id}>{user.email}</li>
      ))}
    </section>
  );
};

export default ProfilePage;
