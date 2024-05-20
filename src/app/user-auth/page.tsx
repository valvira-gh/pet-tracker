import { SignIn } from "@/components/user-authorization/sign-in";
import { SignUp } from "@/components/user-authorization/sign-up";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const UserAuth: React.FC = async () => {
  // const users = await getUsers();

  return (
    <section className="flex flex-col items-center mt-10">
      <Tabs defaultValue="sign-up" className="w-[350px]">
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
    </section>
  );
};

export default UserAuth;
