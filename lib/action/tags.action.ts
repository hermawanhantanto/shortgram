"use server";

import Tag from "@/database/tags.model";
import { connectDB } from "../mongoose";
import { GetAllTagsParams, GetContentsByTagParams } from "@/types";
import Content from "@/database/content.model";
import User from "@/database/user.model";
import { FilterQuery } from "mongoose";

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectDB();
    const { page = 1, pageSize = 10, q, orderBy } = params;

    let filter: FilterQuery<typeof Tag> = {};

    switch (orderBy) {
      case "most-popular":
        filter = { sumContents: -1 };
        break;
      case "newest":
        filter = { createdAt: -1 };
        break;
      case "name":
        filter = { name: -1 };
        break;
      default:
        filter = { createdAt: 1 };
    }

    const tags = await Tag.aggregate([
      {
        $project: {
          name: 1,
          _id: 1,
          sumContents: { $size: "$contents" },
          contents: 1,
          createdAt: 1,
        },
      },
    ]).sort(filter);

    return tags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getContentByTag(params: GetContentsByTagParams) {
  try {
    connectDB();
    const { page = 1, pageSize = 10, q, orderBy, tagId } = params;
    let filter: FilterQuery<typeof Content> = {};

    switch (orderBy) {
      case "most-viewed":
        filter = { views: -1 };
        break;
      case "most-liked":
        filter = { like: -1 };
        break;
      case "most-commented":
        filter = { comment: -1 };
        break;
      default:
        break;
    }
    
    const tags = await Tag.findById(tagId).populate({
      path: "contents",
      model: Content,
      populate: [
        { path: "author", model: User },
        { path: "tags", model: Tag },
      ],
      options: {
        sort: filter,
      },
    });

    const contents = tags.contents;
    const name = tags.name;
    return { contents, name };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTopTags() {
  try {
    connectDB();
    const tags = await Tag.aggregate([
      { $project: { name: 1, sumContents: { $size: "$contents" } } },
    ])
      .sort({ sumContents: -1 })
      .limit(5);

    return tags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
