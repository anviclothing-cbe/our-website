import { Router, Request, Response } from "express";
import { Wishlist } from "../models/Wishlist.js";
import { Product } from "../models/Product.js";

const router = Router();

// Get wishlist for session
router.get("/", async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.query;
    if (!sessionId || typeof sessionId !== "string") {
      return res.status(400).json({ message: "sessionId is required" });
    }

    let wishlist = await Wishlist.findOne({ sessionId }).populate("products");
    
    if (!wishlist) {
      wishlist = await Wishlist.create({ sessionId, products: [] });
    }

    // Return the products array to match frontend expectation
    // Frontend expects: { products: [ { id, title, price, image } ] }
    const formattedProducts = wishlist.products.map((p: any) => ({
      id: p._id.toString(),
      title: p.name,
      price: p.price,
      originalPrice: p.originalPrice,
      image: p.image,
      slug: p.slug
    }));

    res.json({ products: formattedProducts });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add to wishlist
router.post("/", async (req: Request, res: Response) => {
  try {
    const { sessionId, productId } = req.body;
    if (!sessionId || !productId) {
      return res.status(400).json({ message: "sessionId and productId required" });
    }

    let wishlist = await Wishlist.findOne({ sessionId });
    if (!wishlist) {
      wishlist = new Wishlist({ sessionId, products: [] });
    }

    // Avoid duplicates
    if (!wishlist.products.includes(productId as any)) {
      wishlist.products.push(productId as any);
      await wishlist.save();
    }

    res.json({ message: "Added to wishlist", success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Remove from wishlist
router.delete("/:productId", async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    // req.body might not be sent with DELETE in all fetch configurations, but the frontend currently sends it.
    // If not, we can fall back to query
    const sessionId = req.body.sessionId || req.query.sessionId;
    
    if (!sessionId || !productId) {
      return res.status(400).json({ message: "sessionId and productId required" });
    }

    const wishlist = await Wishlist.findOne({ sessionId });
    if (wishlist) {
      wishlist.products = wishlist.products.filter(
        (id) => id.toString() !== productId
      ) as any;
      await wishlist.save();
    }

    res.json({ message: "Removed from wishlist", success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
