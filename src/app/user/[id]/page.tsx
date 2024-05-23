// src/app/user/[slug]/page.tsx
import UserProfile from "@/components/UserProfile";
import AddProfileDataForm from "@/components/AddProfileDataForm";

type UserDataTypes = {
  id: string;
  email: string;
  role: string;
  isLogged: boolean;
  createAt: string;
  updatedAt: string;
};

export async function generateStaticParams() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const users = await fetch(`${apiUrl}/api/users`).then((res) => res.json());

  console.log("Fetched users: ", users);

  return users.map((user: UserDataTypes) => ({
    slug: user.id.toString(),
  }));
}

const ProfilePage = ({ params }: { params: { id: string } }) => {
  return (
    <section className="flex flex-col justify-center items-center">
      <UserProfile id={params.id} />
      <AddProfileDataForm />
    </section>
  );
};

export default ProfilePage;
