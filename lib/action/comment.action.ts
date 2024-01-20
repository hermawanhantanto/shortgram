"use server";
import Comment from "@/database/comment.model";
import Content from "@/database/content.model";
import { CreateCommentParams } from "@/types";
import { revalidatePath } from "next/cache";

export async function createComments(params: CreateCommentParams) {
  try {
    const { author, description, path, contentId } = params;

    const comment = await Comment.create({
      description,
      author,
    });

    await Content.findByIdAndUpdate(contentId, {
      $push: { comment: comment._id },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
