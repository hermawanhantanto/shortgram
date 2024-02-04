"use server";
import Comment from "@/database/comment.model";
import Content from "@/database/content.model";
import User from "@/database/user.model";
import {
  CountCommentsParams,
  CreateCommentParams,
  GetAllCommentsContent,
  LikeCommentParams,
} from "@/types";
import { revalidatePath } from "next/cache";
import { connectDB } from "../mongoose";
import { FilterQuery } from "mongoose";

export async function createComments(params: CreateCommentParams) {
  try {
    const { author, description, path, contentId } = params;

    const comment = await Comment.create({
      content: contentId,
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

export async function getAllCommentsContent(params: GetAllCommentsContent) {
  try {
    connectDB();
    const { contentId, orderBy } = params;
    let filter: FilterQuery<typeof Comment> = {};
    switch (orderBy) {
      case "newest":
        filter = { createdAt: -1 };
        break;
      case "most-liked":
        filter = { like: -1 };
        break;
      default:
        break;
    }
    const content = await Content.findById(contentId)
      .populate({
        path: "comment",
        model: Comment,
        populate: {
          path: "author",
          model: User,
        },
        options: {
          sort: filter,
        },
      })
      .populate({
        path: "author",
        model: User,
      });

    const comments = content.comment;

    return comments;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function likeComment(params: LikeCommentParams) {
  try {
    connectDB();
    const { commentId, userId, hasLiked, path } = params;
    const comment = await Comment.findById(commentId);

    if (hasLiked) {
      await comment.updateOne({ $pull: { like: userId } });
    } else {
      await comment.updateOne({ $push: { like: userId } });
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function countComments(params: CountCommentsParams) {
  try {
    connectDB();
    const { userId } = params;
    const countComments = await Comment.countDocuments({ author: userId });
    return countComments;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
