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

export const SignIn: React.FC = () => {
  return (
    <Card className="w-[350px] bg-gray-100/50 text-background-foreground hover:bg-background hover:shadow-ring hover:border-accent ">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription className="hover:muted">
          {" "}
          Login to your
          <span className="text-primary tracking-wide text-bold">
            {" "}
            Pet Tracker{" "}
          </span>
          profile.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4 text-end">
          <Input
            className="hover:ring-2 hover:ring-primary hover:bg-muted"
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
            className=" antialiased  bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary hover:border-2 hover:border-ring hover:font-bolder"
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
