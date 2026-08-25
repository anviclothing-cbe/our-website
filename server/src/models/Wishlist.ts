import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, unique: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

export const Wishlist = mongoose.model("Wishlist", wishlistSchema);
