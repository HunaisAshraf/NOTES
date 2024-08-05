import { model, Schema } from "mongoose";

const noteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  note: {
    type: String,
    required: true,
  },
});

export const NotesModel = model("Model", noteSchema);
