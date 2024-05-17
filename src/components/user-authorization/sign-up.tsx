import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export const SignUp: React.FC = () => {
  return (
    <Card className="w-[350px] bg-gray-100/50 text-background-foreground hover:bg-background hover:shadow-ring hover:border-accent ">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription className="hover:muted">
          {" "}
          Create a new profile to get access for{" "}
          <span className="text-primary tracking-wider "> Pet Tracker </span>.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4 text-end">
          <Input
            className="hover:ring-2 hover:ring-primary hover:"
            type="email"
            id="username"
            placeholder="Email"
          />
          <Input
            type="password"
            // onFocus={}
            id="password"
            placeholder="Password"
            className="hover:ring-2 hover:ring-primary"
          />
          <Button
            className=" antialiased  bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary hover:border-2 hover:border-ring "
            type="submit"
            variant="default"
          >
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
