import z from "zod";

export const contentSchema = z.object({
  caption: z.string().min(5),
  image: z
    .string()
    .min(1, { message: "You must upload an image" })
    .max(100, { message: "You must upload an image" }),
  tags: z.array(z.string().min(1).max(100)).min(1).max(3),
});

export const commentSchema = z.object({
  description: z.string(),
});
