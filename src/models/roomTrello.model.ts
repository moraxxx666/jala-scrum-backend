import { Schema, model, Document } from "mongoose";

export interface TrelloRoom extends Document {
  stories: object[];
  IDList?: string;
  cards?: object[];
}

const TrelloRoomSchema = new Schema({
  stories: { type: Array },
  IDList: { type: String },
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
      }
    ]
  }
});

export default model<TrelloRoom>("TrelloRoom", TrelloRoomSchema);
