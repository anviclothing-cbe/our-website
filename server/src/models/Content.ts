import mongoose, { Document, Schema } from "mongoose";

export interface IContent extends Document {
  type: string;
  data: any;
}

const ContentSchema = new Schema<IContent>(
  {
    type: { type: String, required: true, unique: true },
    data: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

export const Content = mongoose.model<IContent>("Content", ContentSchema);
