import { Schema, model, Document } from "mongoose";

export interface Story extends Document {
  story: string;
  description: string;
  createdBy: string;
  active: boolean;
  votes: object[];
}

const StorySchema = new Schema({
  story: { type: String },
  description: { type: String },
  votes: { type: Array },
  active: { type: Boolean, default: true },
  
});

export default model<Story>("storie", StorySchema);
