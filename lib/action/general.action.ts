"use server";
import {
  GetGlobalSearchParams,
  GetMedalsParams,
  GetRecommendationParams,
} from "@/types";
import { connectDB } from "../mongoose";
import Content from "@/database/content.model";
import Tag from "@/database/tags.model";
import User from "@/database/user.model";
import { FilterQuery } from "mongoose";
import Interaction from "@/database/Interaction";

export async function getGlobalSearch(params: GetGlobalSearchParams) {
  try {
    connectDB();
    const { globalSearch } = params;
    const regex = { $regex: new RegExp(globalSearch, "i") };
    const results = [];

    const modelInfo = [
      {
        model: Content,
        field: "caption",
        type: "content",
      },
      {
        model: Tag,
        field: "name",
        type: "tag",
      },
      {
        model: User,
        field: "name",
        type: "user",
      },
    ];

    for (const { model, field, type } of modelInfo) {
      const response = await model.find({ [field]: regex }).limit(3);

      results.push(
        ...response.map((item: any) => ({
          title: item[field],
          id: type === "user" ? item.clerkId : item._id,
          type,
        }))
      );
    }

    return JSON.stringify(results);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getMedals(params: GetMedalsParams) {
  try {
    connectDB();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });

    if (!user) throw new Error("User not found");

    const gold = Math.floor(user.follower.length / 100);
    const silver = Math.floor((user.follower.length % 100) / 10);
    const bronze = Math.floor((user.follower.length % 10) / 1);

    return { gold, silver, bronze };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getRecommendation(params: GetRecommendationParams) {
  try {
    connectDB();
    const { userId, q, page = 1, pageSize = 10 } = params;
    const skipAmount = (page - 1) * pageSize;
    const query: FilterQuery<typeof Content> = {};
    if (q) {
      query.$or = [{ caption: { $regex: new RegExp(q, "i") } }];
    }
    const user = await User.findOne({ clerkId: userId });

    if (!user) throw new Error("User not found");

    const interaction = await Interaction.find({
      user: user._id,
    })
      .populate("tags")
      .exec();

    const tags = interaction.reduce((tags, interaction) => {
      if (interaction.tags) {
        tags = tags.concat(interaction.tags);
      }

      return tags;
    }, []);

    const distinctTags = [
      // @ts-ignore
      ...new Set(tags.map((tag) => tag._id)),
    ];

    query.$and = [
      {
        tags: { $in: distinctTags },
      },
      {
        author: { $ne: user._id },
      },
    ];

    const contents = await Content.find(query)
      .populate([
        { path: "author", model: User },
        { path: "tags", model: Tag },
      ])
      .sort({ views: -1, like: -1 })
      .skip(skipAmount)
      .limit(pageSize);

    const sumContents = await Content.countDocuments(query);

    return { contents, sumContents };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
