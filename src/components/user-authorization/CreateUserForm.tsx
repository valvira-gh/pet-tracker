"use client";

// dependencies
import { useFormState } from "react-dom";
import { useState } from "react";
import { useRouter } from "next/navigation";

// actions

// shadcn-ui components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// define the props that the CreateUserForm component expects
interface UserFormProps {
  formAction: any; // the action to run after the form submit
  initialData: {
    // the initial data for the form fields
    email: string;
    password: string;
    message: string;
  };
  onSuccess: () => void;
}

export const CreateUserForm: React.FC<UserFormProps> = ({
  formAction,
  initialData,
  onSuccess,
}) => {
  const [formState, action] = useFormState(formAction, {
    message: "",
  });
  const [email, setEmail] = useState<string | undefined>("");
  const [password, setPassword] = useState();

  return (
    <form>
      <div className="flex flex-col my-2">
        <Input
          name="email"
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col my-2">
        <Input
          name="password"
          id="password"
          type="password"
          placeholder="Password"
        />
      </div>
      <div className="flex justify-end">
        {formState.message}
        <Button type="submit" className="font-semibold font-inter ">
          Submit
        </Button>
      </div>
    </form>
  );
};

export const BaseForm = () => {
  const router = useRouter();

  const handleSuccess = () => {
    console.log("success!");
    router.push("/");
  };

  return (
    <div className="flex flex-col">
      <CreateUserForm
        formAction={createNewUser}
        initialData={{ email: "", password: "", message: "" }}
        onSuccess={handleSuccess}
      />
    </div>
  );
};
