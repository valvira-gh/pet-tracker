import { CreateUserForm } from "@/components/user-authorization/CreateUserForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export const SignUp = async () => {
  // Initialize the form state and action
  // const [formState, formAction] = useActionState(createUser, {});

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
        <CreateUserForm />
        {/* <AddUserForm /> */}
      </CardContent>
    </Card>
  );
};
