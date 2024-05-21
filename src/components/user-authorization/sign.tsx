import { SignForm } from "./SignForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

type SignProps = {
  title: string;
  description: string;
};

export const SignBase: React.FC<SignProps> = ({ title, description }) => {
  return (
    <Card className="w-[350px] bg-gray-100/50 text-background-foreground hover:bg-background hover:shadow-ring hover:border-accent ">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="hover:muted">
          {description}

          {/* {" "}
          Login to your
          <span className="text-primary tracking-wide text-bold">
            {" "}
            Pet Tracker{" "}
          </span>
          profile. */}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignForm title={title} />
      </CardContent>
    </Card>
  );
};
