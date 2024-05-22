"use client";
import { useFormState } from "react-dom";
import { useState } from "react";

import { onAddProfileFormAction } from "@/lib/actions";

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

// Right at the top of this file we can see that this is going to be a client component because there is a "use client"; directive. We need that so that we can use the useFormState hook.

// Then in the body of the component we invoke useFormState and give it two things; the server action function, and the initial state. The initial state object needs to match the type of the FormState type in formPostAction.ts .

// What comes out is a tuple with the current state and an action function. On the initial render that state value will match the initial state.But after a form post the state will be whatever came back from the server.

const AddProfileDataForm = () => {
  const [state, action] = useFormState(onAddProfileFormAction, {
    message: "",
  });
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    age: "",
  });

  console.log(profile.firstName);
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
        <form action={action} className="">
          <div>
            <Label htmlFor="first-name">First name:</Label>
            <Input
              type="text"
              name="first-name"
              className="bg-background hover:bg-input hover:border-ring mt-1"
              value={profile.lastName}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  lastName: e.target.value,
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="last-name">Last name:</Label>
            <Input
              type="text"
              name="last-name"
              className="bg-background hover:bg-input hover:border-ring mt-1"
              value={profile.firstName}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  lastName: e.target.value,
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="age">Age: </Label>
            <Input
              type="number"
              name="age"
              className="bg-background hover:bg-input hover:border-ring mt-1"
              value={profile.age}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  age: e.target.value,
                })
              }
            />
          </div>
        </form>
        <div className="flex justify-end mt-2">
          <Button className="font-bold" type="submit">
            Submit
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col justify-center items-center text-sm">
        <CardDescription>Pet Tracker 0.1.0</CardDescription>

        <CardDescription>All rights reserved (C)</CardDescription>
      </CardFooter>
    </Card>
  );
};

export default AddProfileDataForm;
