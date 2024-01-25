"use server";

import Interaction from "@/database/Interaction";
import Content from "@/database/content.model";
import User from "@/database/user.model";
import { CountViewsParams } from "@/types";
import { connectDB } from "../mongoose";

export async function countViews(params: CountViewsParams) {
  try {
    connectDB();
    const { contentId, userId } = params;
    const user = await User.findById(userId);
    const content = await Content.findByIdAndUpdate(contentId, {
      $inc: { views: 1 },
    });

    if (userId) {
      const isView = await Interaction.findOne({
        user: user._id,
        content: contentId,
        action: "view",
      });

      if (isView) return;

      await Interaction.create({
        content: contentId,
        user: user._id,
        action: "view",
        tags: content.tags,
      });
    }

  } catch (error) {
    console.log(error);
    throw error;
  }
}
