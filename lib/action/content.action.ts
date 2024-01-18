"use server";
import { CreateContentParams } from "@/types";
import { connectDB } from "../mongoose";
import Content from "@/database/content.model";
import Tag from "@/database/tags.model";

export async function createContent(params: CreateContentParams) {
  try {
    await connectDB();
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

    content.tags = tagDocuments;
    await content.save();

    // add reputation to author

    return { content };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
