import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { Sign } from "@/components/user-authorization/sign";

const UserAuth: React.FC = async () => {
  return (
    <section className="flex flex-col items-center mt-10">
      <Tabs defaultValue="sign-up" className="w-[350px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sign-in">Sign In</TabsTrigger>
          <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="sign-in">
          <Sign title="Sign-In" description="Sign-In description" />
        </TabsContent>
        <TabsContent value="sign-up">
          <Sign title="Sign-Up" description="Sign-Up description" />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default UserAuth;
