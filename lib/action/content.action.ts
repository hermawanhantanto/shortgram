"use server";
import Content from "@/database/content.model";
import Tag from "@/database/tags.model";
import User from "@/database/user.model";
import {
  CreateContentParams,
  DeleteCommentParams,
  DeleteContentParams,
  EditContentParams,
  GetAllContentsParams,
  GetContentByAuthorParams,
  GetContentByIdParams,
  LikeContentParams,
  SaveContentParams,
} from "@/types";
import { revalidatePath } from "next/cache";
import { connectDB } from "../mongoose";
import Comment from "@/database/comment.model";
import Interaction from "@/database/Interaction";
import { FilterQuery } from "mongoose";

export async function createContent(params: CreateContentParams) {
  try {
    connectDB();
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
        { $setOnInsert: { name: tag }, $push: { contents: content._id } },
        { upsert: true, new: true }
      );
      tagDocuments.push(existingTags._id);
    }

    await Content.findByIdAndUpdate(content._id, {
      $push: { tags: { $each: tagDocuments } },
    });
    // add reputation to author
    return content;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllContents(params: GetAllContentsParams) {
  try {
    connectDB();
    const { q, orderBy, page = 1, pageSize = 10 } = params;

    let filter: FilterQuery<typeof Content> = {};

    switch (orderBy) {
      case "newest":
        filter = {
          createdAt: -1,
        };
        break;
      case "most-viewed":
        filter = {
          views: -1,
        };
        break;
      case "most-liked":
        filter = {
          like: -1,
        };
        break;
      case "most-commented":
        filter = {
          comment: -1,
        };
        break;
      default:
        break;
    }

    const contents = await Content.find()
      .populate({ path: "author", model: User })
      .populate({ path: "tags", model: Tag })
      .sort(filter);

    return contents;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getContentById(params: GetContentByIdParams) {
  try {
    connectDB();
    const { id } = params;

    const content = await Content.findById(id)
      .populate({ path: "author", model: User })
      .populate({ path: "tags", model: Tag });

    return content;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function likeContent(params: LikeContentParams) {
  try {
    connectDB();
    const { contentId, userId, hasLiked, path } = params;
    const content = await Content.findById(contentId);

    if (hasLiked) {
      await content.updateOne({ $pull: { like: userId } });
    } else {
      await content.updateOne({ $push: { like: userId } });
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function saveContent(params: SaveContentParams) {
  try {
    connectDB();
    const { contentId, userId, hasSaved, path } = params;
    const user = await User.findById(userId);

    if (hasSaved) {
      await user.updateOne({ $pull: { saved: contentId } });
    } else {
      await user.updateOne({ $push: { saved: contentId } });
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getContentByAuthor(params: GetContentByAuthorParams) {
  try {
    connectDB();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      throw new Error();
    }
    const contents = await Content.find({ author: user._id }).populate([
      { path: "author", model: User },
      { path: "tags", model: Tag },
    ]);

    return contents;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteContent(params: DeleteContentParams) {
  try {
    connectDB();
    const { contentId } = params;
    const contents = await Content.findById(contentId).populate({
      path: "tags",
      model: Tag,
    });

    if (!contents) {
      throw new Error();
    }

    await Comment.deleteMany({ content: contentId });
    await User.updateMany({ $pull: { saved: contentId } });
    await Interaction.deleteMany({ content: contentId });

    for (const tag of contents.tags) {
      const currentTag = await Tag.findByIdAndUpdate(
        tag._id,
        {
          $pull: { contents: contentId },
        },
        { upsert: true, new: true }
      );

      if (currentTag.contents.length <= 0) {
        await Tag.findByIdAndDelete(currentTag._id);
      }
    }

    await Content.findByIdAndDelete(contentId);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteComment(params: DeleteCommentParams) {
  try {
    connectDB();
    const { commentId } = params;
    const comment = await Comment.findById(commentId);

    if (!comment) {
      throw new Error();
    }

    await Content.findByIdAndUpdate(comment.content, {
      $pull: { comment: comment._id },
    });

    await Comment.findByIdAndDelete(commentId);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function editContent(params: EditContentParams) {
  try {
    connectDB();
    const { contentId, updateData } = params;

    const content = await Content.findByIdAndUpdate(contentId, {
      caption: updateData.caption,
      image: updateData.image,
    }).populate({
      path: "tags",
      model: Tag,
    });

    if (!content) {
      throw new Error();
    }

    if (updateData.tags) {
      const tagDocuments = [];
      for (const tag of content.tags) {
        const currentTag = await Tag.findByIdAndUpdate(
          tag._id,
          {
            $pull: { contents: contentId },
          },
          { upsert: true, new: true }
        );

        await Content.findByIdAndUpdate(content._id, {
          $pull: { tags: currentTag._id },
        });

        if (currentTag.contents.length <= 0) {
          await Tag.findByIdAndDelete(currentTag._id);
        }
      }

      for (const tag of updateData.tags) {
        const existingTags = await Tag.findOneAndUpdate(
          { name: { $regex: new RegExp(`^${tag}$`, "i") } },

          { $setOnInsert: { name: tag }, $push: { contents: content._id } },
          { upsert: true, new: true }
        );
        tagDocuments.push(existingTags);
      }

      await Content.findByIdAndUpdate(content._id, {
        $push: { tags: { $each: tagDocuments } },
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
