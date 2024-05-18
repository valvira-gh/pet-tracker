"use client";

// dependencies
import { useFormState } from "react-dom";
import { useState } from "react";

// actions
import { fetchUsers, createNewUser } from "@/lib/actions";

// shadcn-ui components
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormDescription,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";

// define the props that the CreateUserForm component expects
interface UserFormProps {
  formAction: any; // the action to run after the form submit
  initialData: {
    // the initial data for the form fields
    email: string;
    password: string;
  };
}

export const CreateUserForm: React.FC<UserFormProps> = ({
  formAction,
  initialData,
}) => {
  const [formState, action] = useFormState(formAction, initialData);
  return (
    <form>
      <div className="flex flex-col my-2">
        <Input name="email" id="email" type="email" placeholder="Email" />
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
        <Button type="submit" className="font-semibold font-inter ">
          Submit
        </Button>
      </div>
    </form>
  );
};

export const BaseForm = () => {
  return (
    <div className="flex flex-col">
      <CreateUserForm
        formAction={createNewUser}
        initialData={{ email: "", password: "" }}
      />
    </div>
  );
};
