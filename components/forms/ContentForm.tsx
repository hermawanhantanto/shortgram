"use client";
import { contentSchema } from "@/app/validation";
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
import { Textarea } from "@/components/ui/textarea";
import { createContent, editContent } from "@/lib/action/content.action";
import { zodResolver } from "@hookform/resolvers/zod";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import Spinner from "../shared/Spinner";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
interface CloudinaryResult {
  public_id: string;
}

interface Props {
  mongoUser: string;
  caption?: string;
  image?: string;
  tags?: string[];
  contentId?: string;
}

const ContentForm = ({ mongoUser, caption, image, tags, contentId }: Props) => {
  const form = useForm<z.infer<typeof contentSchema>>({
    defaultValues: {
      caption: caption || "",
      image: image || "",
      tags: tags || [],
    },
    resolver: zodResolver(contentSchema),
  });
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(values: z.infer<typeof contentSchema>) {
    try {
      setIsSubmitting(true);
      const { caption, tags, image } = values;

      if (contentId) {
        const updateData = {
          caption,
          image,
          tags,
        };

        await editContent({
          contentId: JSON.parse(contentId),
          updateData,
        });

        toast("Succes edit your content");
      } else {
        const content = await createContent({
          caption,
          author: JSON.parse(mongoUser),
          tags,
          image,
        });
        if (!content) {
          toast("Something went wrong, please try again!");
        }
        toast("Succes upload your content");
      }
      router.push("/");
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleTags = (values: string) => {
    if (values !== "") {
      const tagValues = values.split(",");

      if (tagValues.length > 3) {
        return form.setError("tags", {
          type: "required",
          message: "Tag must be less than 3 tag.",
        });
      }

      form.setValue("tags", tagValues);
      form.clearErrors("tags");
    } else {
      form.setValue("tags", []);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Caption<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea {...field} rows={10} className="dark:bg-secondary" />
              </FormControl>
              <FormDescription>
                Write a caption for your content
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Image<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <>
                  {field.value && (
                    <CldImage
                      src={field.value}
                      width={270}
                      height={180}
                      alt="content-image"
                    />
                  )}
                  <CldUploadWidget
                    uploadPreset="shortgram"
                    onUpload={(result, widget) => {
                      const info = result.info as CloudinaryResult;
                      field.onChange(info.public_id);
                    }}
                  >
                    {({ open }) => (
                      <Button
                        onClick={() => open()}
                        className="block rounded text-white "
                      >
                        UPLOAD AN IMAGE
                      </Button>
                    )}
                  </CldUploadWidget>
                </>
              </FormControl>
              <FormDescription>
                Upload an image for your content
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Tags<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <>
                  <Input
                    placeholder="Enter an tags"
                    onChange={(e) => handleTags(e.target.value)}
                    defaultValue={field.value.join(",")}
                    className="min-h-[46px] rounded border-none bg-secondary px-5 py-1.5"
                  />
                  <div className="my-2 flex items-center gap-2">
                    {field.value.length > 0 &&
                      field.value.map((tag, index) => (
                        <Badge
                          className="flex-center subtle-regular gap-2 rounded py-2 capitalize text-blue-400"
                          key={index}
                          variant="secondary"
                        >
                          {tag}
                        </Badge>
                      ))}
                  </div>
                </>
              </FormControl>
              <FormDescription>
                Add up to 3 tags to describe what your content is about. You
                need to press enter to add a tag.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="rounded text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? <Spinner /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default ContentForm;
