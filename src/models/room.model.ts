import { Schema, model, Document } from "mongoose";

export interface Room extends Document {
  story: string;
  description: string;
  createdBy: string;
  active?: boolean;
  votes?: any[];
  cards?: object[];
}

const RoomSchema = new Schema({
  story: { type: String },
  description: { type: String },
  createdBy: { type: String },
  votes: { type: Array, default: [] },
  active: { type: Boolean, default: true },
  cards: {
    type: Array,
    default: [
      {
        val: 1,
        display: "1"
      },
      {
        val: 2,
        display: "2"
      },
      {
        val: 3,
        display: "3"
      },
      {
        val: 5,
        display: "5"
      },
      {
        val: 8,
        display: "8"
      },
      {
        val: 13,
        display: "13"
      },

    ]
  }
})

export default model<Room>("Room", RoomSchema);
