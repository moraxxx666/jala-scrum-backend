import { Schema, model, Document } from "mongoose";

export interface Story extends Document {
  title: string;
  description: string;
  createdBy: string;
  active: boolean;
  votes: object[];
}

const StorySchema = new Schema({
  title: { type: String },
  description: { type: String },
  createdBy: { type: String },
  active: { type: Boolean, default: true },
  votes: { type: Array, default: [] }
});

export default model<Story>("storie", StorySchema);
