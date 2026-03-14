import { Schema, model, models } from "mongoose";

export type NoteType = "note" | "link" | "insight";

export interface INote {
  title: string;
  content: string;
  type: NoteType;
  tags: string[];
  sourceUrl?: string;
  summary?: string;
  aiTags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const NoteSchema = new Schema<INote>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ["note", "link", "insight"],
      required: true,
    },
    tags: { type: [String], default: [] },
    sourceUrl: { type: String, default: "" },
    summary: { type: String, default: "" },
    aiTags: { type: [String], default: [] },
  },
  { timestamps: true }
);

const Note = models.Note || model<INote>("Note", NoteSchema);

export default Note;