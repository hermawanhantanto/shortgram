import { Document } from "mongodb";
import { Schema, model, models } from "mongoose";

export interface IContent extends Document {
  caption: string;
  author: Schema.Types.ObjectId;
  like: Schema.Types.ObjectId[];
  image: string;
  tags: Schema.Types.ObjectId;
  comment: Schema.Types.ObjectId[];
  createdAt: Date;
  views: number;
}

const ContentSchema = new Schema({
  caption: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  like: [{ type: Schema.Types.ObjectId, ref: "User" }],
  image: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  comment: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  createdAt: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
});

const Content = models.Content || model("Content", ContentSchema);

export default Content;
