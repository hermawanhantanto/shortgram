"use server";
import { CreateContentParams } from "@/types";
import { connectDB } from "../mongoose";
import Content from "@/database/content.model";
import Tag from "@/database/tags.model";
import User from "@/database/user.model";

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
