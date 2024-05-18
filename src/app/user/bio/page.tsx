import { getUsers } from "@/lib/actions";
import { Label } from "@/components/ui/label";

const BioPage = async () => {
  return (
    <section className="flex flex-col items-start">
      <BioChart />
    </section>
  );
};

const BioChart = async () => {
  const users = await getUsers();

  return (
    <section className="flex flex-col items-center m-4">
      {users.map((user) => (
        <div key={user.id} className="flex flex-col">
          <div className="flex items-center border p-2">
            <Label>userId:</Label>
            <p className=" font-semibold m-2">{user.id}</p>
          </div>
          <div className="flex items-center border p-2">
            <Label>email:</Label>
            <p className=" font-semibold m-2">{user.email}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default BioPage;
