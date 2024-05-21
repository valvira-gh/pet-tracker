"use client";
// deps
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
// shadcn
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// schema
const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type SignFormProps = {
  title: string;
};

export const SignForm: React.FC<SignFormProps> = ({ title }) => {
  // define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // returned message from api
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>("");

  const loginOrRegister = (title: string) => {
    if (title === "Sign-Up") {
      return "register";
    } else {
      return "login";
    }
  };

  const apiAction = loginOrRegister(title);

  // submit handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // send data to the backend
    const response = await fetch(`/api/${apiAction}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      const data = await response.json();
      setSuccess(true);
      setMessage(data.message);
    } else {
      const errorData = await response.json();
      setSuccess(false);
      setMessage(errorData.message);
    }
  };

  console.log("errorData: ", errorMessage);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between items-center">
          <div>
            {message && (
              <p
                className={`text-center ${
                  success ? "text-green-500" : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}
          </div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};
