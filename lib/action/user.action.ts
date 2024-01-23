"use server";
import {
  CreateUserParams,
  DeleteUserParams,
  FollowUserParams,
  UpdateUserParams,
} from "@/types";
import { connectDB } from "../mongoose";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";

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
    await connectDB();
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
