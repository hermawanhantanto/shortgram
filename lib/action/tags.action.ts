"use server";

import Tag from "@/database/tags.model";
import { connectDB } from "../mongoose";
import { GetContentsByTagParams } from "@/types";
import Content from "@/database/content.model";
import User from "@/database/user.model";

export async function getAllTags() {
  try {
    connectDB();
    const tags = await Tag.find();
    return tags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getContentByTag(params: GetContentsByTagParams) {
  try {
    connectDB();
    const { tagId } = params;
    const tags = await Tag.findById(tagId).populate({
      path: "contents",
      model: Content,
      populate: [
        { path: "author", model: User },
        { path: "tags", model: Tag },
      ],
    });

    const contents = tags.contents;
    const name = tags.name;
    return { contents, name };
    
  } catch (error) {
    console.log(error);
    throw error;
  }
}
