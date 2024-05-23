// src/app/user/[id]/page.tsx

import UserProfile from "@/components/UserProfile";
import AddProfileDataForm from "@/components/AddProfileDataForm";

export async function generateStaticParams() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const users = await fetch(`${apiUrl}/api/users`).then((res) => res.json());

  return users.map((user: { id: string }) => ({
    id: user.id.toString(),
  }));
}

const ProfilePage = ({ params }: { params: { id: string } }) => {
  return (
    <section className="flex flex-col justify-center items-center">
      <UserProfile id={params.id} />
      <AddProfileDataForm id={params.id} />
    </section>
  );
};

export default ProfilePage;
