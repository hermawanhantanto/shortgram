"use client";
import { commentSchema } from "@/app/validation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { createComments } from "@/lib/action/comment.action";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Spinner from "../shared/Spinner";
import axios from "axios";

interface Props {
  contentId: string;
  userId: string;
  caption: string;
}

const CommentForm = ({ contentId, userId, caption }: Props) => {
  const editorRef = useRef(null);
  const { theme } = useTheme();
  const form = useForm<z.infer<typeof commentSchema>>({
    defaultValues: {
      description: "",
    },
    resolver: zodResolver(commentSchema),
  });
  const pathname = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerate, setIsGenerate] = useState(false);
  async function onSubmit(values: z.infer<typeof commentSchema>) {
    try {
      setIsSubmitting(true);
      await createComments({
        contentId: JSON.parse(contentId),
        author: JSON.parse(userId),
        description: values.description,
        path: pathname,
      });

      toast("Success add comment");
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }

  const generateAI = async () => {
    try {
      setIsGenerate(true);
      const response = await axios.post("http://localhost:3000/api/chatgpt", {
        caption,
      });
      if (editorRef.current) {
        // @ts-ignore
        editorRef.current.target.selection.setContent(response.data);
      }
      toast("Success generate AI");
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsGenerate(false);
    }
  };
  return (
    <section className="flex flex-col gap-2">
      <Button
        className="w-fit self-end rounded bg-secondary text-primary hover:text-white"
        onClick={() => generateAI()}
        disabled={isGenerate}
      >
        {isGenerate ? <Spinner /> : "Generate AI"}
      </Button>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-10 flex flex-col space-y-8"
        >
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
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
                      content_style:
                        "body { font-family:Inter; font-size:16px }",
                      skin: theme === "dark" ? "oxide-dark" : "oxide",
                      content_css: theme === "dark" ? "dark" : "default",
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="self-end rounded text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner /> : "Submit"}
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default CommentForm;
