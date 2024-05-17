import { SignIn } from "@/components/user-authorization/sign-in";
import { SignUp } from "@/components/user-authorization/sign-up";
import { getUsers } from "@/lib/actions";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const UserAuth: React.FC = async () => {
  const users = await getUsers();
  console.log(users);
  return (
    <section className="flex flex-col items-center mt-10">
      <Tabs defaultValue="sign-in" className="w-[350px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sign-in">Sign In</TabsTrigger>
          <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="sign-in">
          <SignIn />
        </TabsContent>
        <TabsContent value="sign-up">
          <SignUp />
        </TabsContent>
      </Tabs>

      {users &&
        users.map((user) => (
          <li key={user.id} className="text-foreground">
            {user.email}
          </li>
        ))}
    </section>
  );
};

export default UserAuth;
