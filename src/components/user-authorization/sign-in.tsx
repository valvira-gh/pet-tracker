import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { SignInForm } from "./sign-in-form";

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
        <SignInForm />
      </CardContent>
    </Card>
  );
};
