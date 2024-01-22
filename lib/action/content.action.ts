"use server";
import {
  CreateContentParams,
  GetContentByIdParams,
  LikeContentParams,
  SaveContentParams,
} from "@/types";
import { connectDB } from "../mongoose";
import Content from "@/database/content.model";
import Tag from "@/database/tags.model";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";

export async function createContent(params: CreateContentParams) {
  try {
    connectDB();
    const { author, caption, image, tags } = params;
    const content = await Content.create({
      caption,
      author,
      image,
    });

    const tagDocuments = [];

    for (const tag of tags) {
      const existingTags = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { content: content._id } },
        { upsert: true, new: true }
      );
      tagDocuments.push(existingTags._id);
    }

    await Content.findByIdAndUpdate(content._id, {
      $push: { tags: { $each: tagDocuments } },
    });
    // add reputation to author
    return content;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllContents() {
  try {
    connectDB();
    const contents = await Content.find()
      .populate({ path: "author", model: User })
      .populate({ path: "tags", model: Tag })
      .sort({ createdAt: -1 });

    return contents;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getContentById(params: GetContentByIdParams) {
  try {
    connectDB();
    const { id } = params;

    const content = await Content.findById(id)
      .populate({ path: "author", model: User })
      .populate({ path: "tags", model: Tag });

    return content;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function likeContent(params: LikeContentParams) {
  try {
    connectDB();
    const { contentId, userId, hasLiked, path } = params;
    const content = await Content.findById(contentId);

    if (hasLiked) {
      await content.updateOne({ $pull: { like: userId } });
    } else {
      await content.updateOne({ $push: { like: userId } });
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function saveContent(params: SaveContentParams) {
  try {
    connectDB();
    const { contentId, userId, hasSaved, path } = params;
    const user = await User.findById(userId);

    if (hasSaved) {
      await user.updateOne({ $pull: { saved: contentId } });
    } else {
      await user.updateOne({ $push: { saved: contentId } });
    }
    
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
