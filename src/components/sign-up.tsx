import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export const SignUp: React.FC = () => {
  return (
    <Card className="w-[350px] hover:bg-muted ">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription className="hover:muted">
          {" "}
          Register a new user
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4 text-end">
          <Input
            className="hover:ring-2 hover:ring-primary"
            type="email"
            id="username"
            placeholder="Email"
          />
          <Input
            type="password"
            id="password"
            placeholder="Password"
            className="hover:ring-2 hover:ring-primary"
          />
          <Button type="submit">Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
};
