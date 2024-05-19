"use client";
// dependencies
import { useFormState } from "react-dom";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// shadcn-ui components && actions
import { Input } from "@/components/ui/input";
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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { onFormPostAction } from "@/lib/actions";

const formSchema = z.object({
  title: z.string().min(1).max(100),
  content: z.string().min(3, {
    message: "Content must be over 3 characters.",
  }),
  publish: z.boolean({
    required_error: "You have to choose either publish or not.",
    invalid_type_error: "publish check must return a boolean.",
  }),
});

type Post = {
  title: string;
  content: string;
  publish: boolean;
};

export const PetForm = () => {
  // on the initial render, state value will match the initialState (2nd param.).
  // after a form post => the state will be receiving value from the server.
  // thus initialState === type of the FormState (in the server)
  const [state, action] = useFormState(onFormPostAction, {
    message: "",
  });
  const [post, setPost] = useState<Post>({
    title: "",
    content: "",
    publish: false,
  });

  // 1. Define a form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      publish: false,
    },
  });

  function handleCreatePost(values: z.infer<typeof formSchema>) {
    // handle data
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleCreatePost)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="my-2">
              <FormLabel>Post Title</FormLabel>
              <FormControl>
                <Input placeholder="Subject" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea placeholder="What's on your mind?" />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex h-[30px] justify-between  space-x-2 mt-2">
          <div className="space-x-2 flex mt-2">
            <Checkbox id="publish" />
            <label
              htmlFor="terms"
              className="text-sm font-semibold font-sans leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Publish?
            </label>
          </div>

          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};
