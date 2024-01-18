import { Document } from "mongodb";
import { Schema, model, models } from "mongoose";

export interface IComment extends Document {
  description: string;
  author: Schema.Types.ObjectId;
  like: Schema.Types.ObjectId[];
  createdAt: Date;
}

const CommentSchema = new Schema({
  description: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  like: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
});

const Comment = models.Comment || model("Comment", CommentSchema);

export default Comment;
