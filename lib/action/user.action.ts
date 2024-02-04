"use server";
import Content from "@/database/content.model";
import Tag from "@/database/tags.model";
import User from "@/database/user.model";
import {
  CreateUserParams,
  DeleteUserParams,
  FollowUserParams,
  GetAllUsersParams,
  GetContentsSavedParams,
  UpdateUserParams,
} from "@/types";
import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";
import { connectDB } from "../mongoose";

export async function createUser(params: CreateUserParams) {
  try {
    connectDB();
    const { clerkId, name, username, email, picture } = params;
    const user = await User.create({
      clerkId,
      name,
      username,
      email,
      picture,
    });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    connectDB();

    const { page = 1, pageSize = 10, q, orderBy } = params;

    let filter = {};

    const query: FilterQuery<typeof User> = {};

    const skipAmount = (page - 1) * pageSize;

    if (q) {
      query.$or = [
        { name: { $regex: new RegExp(q, "i") } },
        { username: { $regex: new RegExp(q, "i") } },
      ];
    }

    switch (orderBy) {
      case "new-users":
        filter = { joinedAt: -1 };
        break;
      case "old-users":
        filter = { joinedAt: 1 };
        break;
      case "top-users":
        filter = { follower: -1 };
        break;
      case "name":
        filter = { name: -1 };
        break;
      default:
        break;
    }

    const users = await User.find(query)
      .sort(filter)
      .skip(skipAmount)
      .limit(pageSize);
    const sumUsers = await User.countDocuments();

    return { users, sumUsers };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserByClerkId(clerkId: string) {
  try {
    connectDB();
    const user = await User.findOne({ clerkId });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectDB();
    const { clerkId, updateData, path } = params;
    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectDB();
    const { clerkId } = params;
    const deleteUser = await User.findOneAndDelete({ clerkId });
    return deleteUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function followUser(params: FollowUserParams) {
  try {
    connectDB();
    const { currentClerkId, targetUserId, isFollowing, path } = params;
    const currentUser = await User.findOne({ clerkId: currentClerkId });
    const targetUser = await User.findById(targetUserId);

    if (isFollowing) {
      await targetUser.updateOne({ $pull: { follower: currentUser._id } });
      await currentUser.updateOne({ $pull: { following: targetUser._id } });
    } else {
      await targetUser.updateOne({ $push: { follower: currentUser._id } });
      await currentUser.updateOne({ $push: { following: targetUser._id } });
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getContentSaved(params: GetContentsSavedParams) {
  try {
    connectDB();
    const { page = 1, pageSize = 10, q, orderBy, userId } = params;
    let filter = {};

    const query: FilterQuery<typeof Content> = {};

    const skipAmount = (page - 1) * pageSize;

    if (q) {
      query.$or = [{ caption: { $regex: new RegExp(q, "i") } }];
    }

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

    const user = await User.findOne({ clerkId: userId }).populate({
      path: "saved",
      model: Content,
      populate: [
        { path: "author", model: User, select: "_id clerkId name picture" },
        { path: "tags", model: Tag, select: "_id name" },
      ],
      options: {
        sort: filter,
        skip: skipAmount,
        limit: pageSize,
      },
      match: query,
    });

    const data = await User.findOne({ clerkId: userId });

    return { contents: user.saved, sumContents: data.saved.length };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTopUsers() {
  try {
    connectDB();
    const users = await User.find().sort({ follower: -1 }).limit(5);
    return users;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
