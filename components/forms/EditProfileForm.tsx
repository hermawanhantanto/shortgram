"use client";
import { editProfileSchema } from "@/app/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import Spinner from "../shared/Spinner";
import { toast } from "sonner";
import { updateUser } from "@/lib/action/user.action";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  bio?: string;
  location?: string;
  clerkId: string;
}

const EditProfileForm = ({ bio, location, clerkId }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const form = useForm<z.infer<typeof editProfileSchema>>({
    defaultValues: {
      bio: bio || "",
      location: location || "",
    },
    resolver: zodResolver(editProfileSchema),
  });

  async function onSubmit(values: z.infer<typeof editProfileSchema>) {
    try {
      setIsLoading(true);
      await updateUser({
        path: pathname,
        updateData: {
          location: values.location,
          bio: values.bio,
        },
        clerkId,
      });
      toast("Success edit profile");
      router.push(`/profile/${clerkId}`);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={10}
                  className="dark:bg-secondary"
                  placeholder="Write some words for your bio profile"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="location"
                  className="min-h-[46px] dark:bg-secondary"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="rounded text-white"
        >
          {isLoading ? <Spinner /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default EditProfileForm;
