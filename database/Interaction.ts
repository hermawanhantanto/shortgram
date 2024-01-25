import { Schema, model, models } from "mongoose";

export interface IInteraction {
  action: string;
  user: Schema.Types.ObjectId;
  content: Schema.Types.ObjectId;
  tags: Schema.Types.ObjectId[];
  answer: Schema.Types.ObjectId;
  createdAt: Date;
}

const InteractionSchema = new Schema({
  action: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  content: { type: Schema.Types.ObjectId, ref: "Content" },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  answer: { type: Schema.Types.ObjectId, ref: "Answer" },
  createdAt: { type: Date, default: Date.now },
});

const Interaction =
  models.Interaction || model("Interaction", InteractionSchema);

export default Interaction;
