// src/app/user/[slug]/page.tsx
import UserProfile from "@/components/UserProfile";

type UserDataTypes = {
  id: number;
  email: string;
};

export async function generateStaticParams() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const users = await fetch(`${apiUrl}/api/users`).then((res) => res.json());

  console.log("Fetched users: ", users);

  return users.map((user: UserDataTypes) => ({
    slug: user.id.toString(),
  }));
}

const ProfilePage = ({ params }: { params: { slug: string } }) => {
  return (
    <section className="flex flex-col items-center">
      <UserProfile slug={params.slug} />
    </section>
  );
};

export default ProfilePage;
