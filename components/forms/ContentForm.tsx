"use client";
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import { createContent } from "@/lib/action/content.action";
import { useRouter } from "next/navigation";
import Spinner from "../shared/Spinner";
import { revalidatePath } from "next/cache";
import router from "next/router";

interface CloudinaryResult {
  public_id: string;
}

interface Props {
  mongoUser: string;
}

const ContentForm = ({ mongoUser }: Props) => {
  const editorRef = useRef(null);
  const { theme } = useTheme();
  const form = useForm<z.infer<typeof contentSchema>>({
    defaultValues: {
      caption: "",
      image: "",
      tags: [],
    },
    resolver: zodResolver(contentSchema),
  });
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(values: z.infer<typeof contentSchema>) {
    try {
      setIsSubmitting(true);
      const { caption, tags, image } = values;

      const user = await createContent({
        caption,
        author: JSON.parse(mongoUser),
        tags,
        image,
      });

      if (!user) {
        toast("Something went wrong, please try again!");
      }

      toast("Succes upload your content");
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
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                  onInit={(editor) => {
                    // @ts-ignore
                    editorRef.current = editor;
                  }}
                  onBlur={field.onBlur}
                  onEditorChange={(content) => field.onChange(content)}
                  initialValue={""}
                  init={{
                    height: 350,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "codesample",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                    ],
                    toolbar:
                      "undo redo | " +
                      "codesample | bold italic forecolor | alignleft aligncenter |" +
                      "alignright alignjustify | bullist numlist",
                    content_style: "body { font-family:Inter; font-size:16px }",
                    skin: theme === "dark" ? "oxide-dark" : "oxide",
                    content_css: theme === "dark" ? "dark" : "default",
                  }}
                />
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
