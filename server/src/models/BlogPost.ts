import mongoose, { Document, Schema } from "mongoose";

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  imageUrl: string;
  readTime: string;
  isPublished: boolean;
  publishedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, default: "" },
    content: { type: String, required: true },
    category: { type: String, default: "Uncategorized" },
    imageUrl: { type: String, default: "" },
    readTime: { type: String, default: "5 min read" },
    isPublished: { type: Boolean, default: false },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const BlogPost = mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);
