import { Schema, model, models, Document } from "mongoose";

export interface ITag extends Document {
  name: string;
  contents: Schema.Types.ObjectId[];
  createdAt: Date;
}

const TagSchema = new Schema({
  name: { type: String, required: true, unique: true },
  contents: [{ type: Schema.Types.ObjectId, ref: "Content" }],
  createdAt: { type: Date, default: Date.now },
});

const Tag = models.Tag || model("Tag", TagSchema);

export default Tag;

