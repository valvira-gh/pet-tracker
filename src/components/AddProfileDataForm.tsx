// src/components/AddProfileDataForm.tsx
"use client";

import { useFormState } from "react-dom";
import { useState } from "react";
import { addProfileDataAction } from "@/lib/profile-actions"; // Corrected import path
import { Input } from "@/components/ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

// Define the shape of the form errors
interface FormErrors {
  firstName?: string[];
  lastName?: string[];
  age?: string[];
}

// Define the shape of the form state
interface FormState {
  errors: FormErrors;
}

// Define the props that the AddProfileDataForm component expects
interface ProfileFormProps {
  id: string; // params.id for the URL
  formAction: any; // the action to perform when the form is submitted
  initialData: {
    // the initial data for the form fields
    firstName: string;
    lastName: string;
    age: number;
  };
}

const initialData = {
  firstName: "",
  lastName: "",
  age: 0,
};

// The formAction is the action to perform when the form is submitted.
// We use it as a prop because we will use this for
// create and edit page which both pages don't have the same action
// The initialData is the initial data for the form fields.
const ProfileForm = ({ formAction, initialData }: ProfileFormProps) => {
  // Initialize the form state and action
  const [formState, action] = useFormState<FormState>(formAction, {
    errors: {},
  });

  return (
    <form action={action} className="">
      <div>
        <Label htmlFor="first-name">First name:</Label>
        <Input
          type="text"
          name="first-name"
          className="bg-background hover:bg-input hover:border-ring mt-1"
          defaultValue={initialData.firstName}
        />
        {formState.errors.firstName && (
          <div className="text-red-500">
            {formState.errors.firstName?.join(", ")}
          </div>
        )}
      </div>
      <div>
        <Label htmlFor="last-name">Last name:</Label>
        <Input
          type="text"
          name="last-name"
          className="bg-background hover:bg-input hover:border-ring mt-1"
          defaultValue={initialData.lastName}
        />
        {formState.errors.lastName && (
          <div className="text-red-500">
            {formState.errors.lastName?.join(", ")}
          </div>
        )}
      </div>
      <div>
        <Label htmlFor="age">Age: </Label>
        <Input
          type="number"
          name="age"
          className="bg-background hover:bg-input hover:border-ring mt-1"
          defaultValue={initialData.age}
        />
        {formState.errors.age && (
          <div className="text-red-500">{formState.errors.age?.join(", ")}</div>
        )}
      </div>
      <div className="flex justify-end mt-2">
        <Button className="font-bold" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

const AddProfileDataForm = ({ id }: { id: string }) => {
  return (
    <Card className="border-2 border:ring bg-card px-4 py-2 m-4 w-[450px]">
      <CardHeader>
        <CardTitle>Save your information</CardTitle>
        <CardDescription>
          Add your personal information to your profile. Pet Tracker will
          protect your data from outsiders.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ProfileForm
          id={id}
          formAction={addProfileDataAction}
          initialData={{ firstName: "", lastName: "", age: 0 }}
        />
      </CardContent>
      <CardFooter className="flex flex-col justify-center items-center text-sm">
        <CardDescription>Pet Tracker 0.1.0</CardDescription>
        <CardDescription>All rights reserved (C)</CardDescription>
      </CardFooter>
    </Card>
  );
};

export default AddProfileDataForm;
