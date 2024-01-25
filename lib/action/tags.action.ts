"use server";

import Tag from "@/database/tags.model";

export async function getAllTags() {
  try {
    const tags = await Tag.find();
    return tags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
