"use server";
import {
  CreateUserParams,
  DeleteUserParams,
  FollowUserParams,
  GetContentsSavedParams,
  UpdateUserParams,
} from "@/types";
import { connectDB } from "../mongoose";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";
import Content from "@/database/content.model";
import Tag from "@/database/tags.model";

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

export async function getAllUsers() {
  try {
    connectDB();
    const users = await User.find();
    return users;
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
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId }).populate({
      path: "saved",
      model: Content,
      populate: [
        { path: "author", model: User, select: "_id clerkId name picture" },
        { path: "tags", model: Tag, select: "_id name" },
      ],
    });

    return user.saved;
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
