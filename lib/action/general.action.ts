"use server";
import { GetGlobalSearchParams } from "@/types";
import { connectDB } from "../mongoose";
import Content from "@/database/content.model";
import Tag from "@/database/tags.model";
import User from "@/database/user.model";

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
