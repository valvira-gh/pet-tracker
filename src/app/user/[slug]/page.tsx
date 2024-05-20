import { db } from "@/lib/data";

export async function generateStaticParams() {}

const ProfilePage = ({ params }: { params: { slug: string } }) => {
  return (
    <section className="flex flex-col items-center">
      <h2 className="text-xl font-bold">{params.slug}</h2>
    </section>
  );
};

export default ProfilePage;
