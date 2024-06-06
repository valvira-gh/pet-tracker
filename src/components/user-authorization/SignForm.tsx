"use client";
// deps
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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

interface UserProps {
  id: number;
  email: string;
  isLogged: boolean;
}

export const SignForm: React.FC<SignFormProps> = ({ title }) => {
  const router = useRouter();
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
  const [user, setUser] = useState<string[] | string>({
    id: 0,
    email: "",
    isLogged: false,
  });

  useEffect(() => {
    // get users
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      console.log("Sign-in token from localStorage: ", token);

      if (!token) {
        setErrorMessage("There is not yet token, log in first.");
        setUser("No user found. Try log-in.");
        return;
      }

      const response = await fetch("/api/login", {
        method: "GET",
        headers: {
          Authorization: `Bearer: ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Data from fetchUser: ", data);
        setUser(data);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    };

    fetchUser();
  }, []);

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

      // save the token to localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // redirect to home page after few seconds
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } else {
      const errorData = await response.json();
      setSuccess(false);
      setMessage(errorData.message);
    }
  };

  console.log("errorData: ", errorMessage);

  return (
    <>
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

      {/* DEVELOPMENT STATE MESSAGE */}
      {user ? (
        <div>
          {user?.email} is currently {user.isLogged ? "LOGGED" : "NOT logged"}{" "}
        </div>
      ) : (
        <div>User is not yet fetched...</div>
      )}
    </>
  );
};
