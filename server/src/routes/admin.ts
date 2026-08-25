import { Router, type Request, type Response } from "express";
import fs from "node:fs";
import path from "node:path";
import { Product } from "../models/Product.js";
import { Category } from "../models/Category.js";
import { Order } from "../models/Order.js";
import { Cart } from "../models/Cart.js";
import { Content } from "../models/Content.js";
import { BlogPost } from "../models/BlogPost.js";

const router = Router();

// ─── Auth Middleware ─────────────────────────────────────────────────────────

function requireAdmin(req: Request, res: Response, next: () => void) {
  const token = req.headers["x-admin-token"];
  const expected = Buffer.from(
    `${process.env.ADMIN_EMAIL}:${process.env.ADMIN_PASSWORD}`
  ).toString("base64");
  if (token !== expected) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

// ─── POST /api/admin/login ───────────────────────────────────────────────────

router.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = Buffer.from(
      `${process.env.ADMIN_EMAIL}:${process.env.ADMIN_PASSWORD}`
    ).toString("base64");
    res.json({ token, email });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

// ─── GET /api/admin/dashboard ────────────────────────────────────────────────

router.get("/dashboard", requireAdmin, async (req: Request, res: Response) => {
  try {
    const { Lead } = await import("../models/Lead.js");
    const [totalProducts, totalCategories, totalOrders, pendingOrders, recentOrders, distinctCustomers, totalLeads, recentLeads] =
      await Promise.all([
        Product.countDocuments(),
        Category.countDocuments(),
        Order.countDocuments(),
        Order.countDocuments({ status: "pending" }),
        Order.find().sort({ createdAt: -1 }).limit(5).lean(),
        Order.distinct("customerEmail"),
        Lead.countDocuments(),
        Lead.find().sort({ createdAt: -1 }).limit(5).lean()
      ]);
    
    const revenueAgg = await Order.aggregate([
      { $match: { status: { $ne: "cancelled" } } },
      { $group: { _id: null, total: { $sum: "$total" }, count: { $sum: 1 } } },
    ]);
    
    const totalRevenue = revenueAgg[0]?.total ?? 0;
    const completedOrdersCount = revenueAgg[0]?.count ?? 0;
    const averageOrderValue = completedOrdersCount > 0 ? Math.round(totalRevenue / completedOrdersCount) : 0;
    const totalCustomers = distinctCustomers.length;

    // Generate mock sales data for the last 6 months for chart visualization
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentMonth = new Date().getMonth();
    const salesData = Array.from({ length: 6 }).map((_, i) => {
      const monthIdx = (currentMonth - 5 + i + 12) % 12;
      return {
        name: months[monthIdx],
        revenue: Math.floor(Math.random() * 50000) + 10000,
        orders: Math.floor(Math.random() * 50) + 5
      };
    });

    res.json({ 
      totalProducts, 
      totalCategories, 
      totalOrders, 
      pendingOrders, 
      totalRevenue, 
      averageOrderValue,
      totalCustomers,
      totalLeads,
      recentOrders,
      recentLeads,
      salesData
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch dashboard" });
  }
});

// ─── PRODUCTS CRUD ───────────────────────────────────────────────────────────

// GET /api/admin/products
router.get("/products", requireAdmin, async (req: Request, res: Response) => {
  try {
    const { page = "1", limit = "20", category, search } = req.query;
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const filter: Record<string, unknown> = {};
    if (category) filter.category = category;
    if (search) filter.name = { $regex: search, $options: "i" };
    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .lean();
    res.json({ products, total, page: pageNum, pages: Math.ceil(total / limitNum) });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// POST /api/admin/products
router.post("/products", requireAdmin, async (req: Request, res: Response) => {
  try {
    const { name, description, price, originalPrice, discount, images, category,
      fabric, sizes, inStock, featured, onSale, tags, collections, occasions } = req.body;
    if (!name || !price || !category) {
      res.status(400).json({ error: "name, price and category are required" });
      return;
    }
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") +
      "-" + Date.now();
    const product = new Product({
      name, slug, description, price, originalPrice, discount,
      images: Array.isArray(images) ? images : [],
      category, fabric,
      sizes: Array.isArray(sizes) ? sizes : [],
      inStock: inStock ?? true,
      featured: featured ?? false,
      onSale: onSale ?? false,
      tags: Array.isArray(tags) ? tags : [],
      collections: Array.isArray(collections) ? collections : [],
      occasions: Array.isArray(occasions) ? occasions : [],
    });
    await product.save();
    res.status(201).json(product);
  } catch (err: any) {
    res.status(500).json({ error: err?.message ?? "Failed to create product" });
  }
});

// PUT /api/admin/products/:id
router.put("/products/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const { name, description, price, originalPrice, discount, images, category,
      fabric, sizes, inStock, featured, onSale, tags, collections, occasions } = req.body;
    const update: Record<string, unknown> = {};
    if (name !== undefined) {
      update.name = name;
      update.slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    }
    if (description !== undefined) update.description = description;
    if (price !== undefined) update.price = price;
    if (originalPrice !== undefined) update.originalPrice = originalPrice;
    if (discount !== undefined) update.discount = discount;
    if (images !== undefined) update.images = Array.isArray(images) ? images : [];
    if (category !== undefined) update.category = category;
    if (fabric !== undefined) update.fabric = fabric;
    if (sizes !== undefined) update.sizes = Array.isArray(sizes) ? sizes : [];
    if (inStock !== undefined) update.inStock = inStock;
    if (featured !== undefined) update.featured = featured;
    if (onSale !== undefined) update.onSale = onSale;
    if (tags !== undefined) update.tags = Array.isArray(tags) ? tags : [];
    if (collections !== undefined) update.collections = Array.isArray(collections) ? collections : [];
    if (occasions !== undefined) update.occasions = Array.isArray(occasions) ? occasions : [];
    const product = await Product.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!product) { res.status(404).json({ error: "Product not found" }); return; }
    res.json(product);
  } catch (err: any) {
    res.status(500).json({ error: err?.message ?? "Failed to update product" });
  }
});

// DELETE /api/admin/products/:id
router.delete("/products/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) { res.status(404).json({ error: "Product not found" }); return; }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

// ─── CATEGORIES CRUD ─────────────────────────────────────────────────────────

// GET /api/admin/categories
router.get("/categories", requireAdmin, async (req: Request, res: Response) => {
  try {
    const categories = await Category.find().lean();
    const withCount = await Promise.all(
      categories.map(async (cat) => ({
        ...cat,
        productCount: await Product.countDocuments({ category: cat.slug }),
      }))
    );
    res.json(withCount);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// POST /api/admin/categories
router.post("/categories", requireAdmin, async (req: Request, res: Response) => {
  try {
    const { name, description, image } = req.body;
    if (!name) { res.status(400).json({ error: "name is required" }); return; }
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const cat = new Category({ name, slug, description, image });
    await cat.save();
    res.status(201).json(cat);
  } catch (err: any) {
    res.status(500).json({ error: err?.message ?? "Failed to create category" });
  }
});

// PUT /api/admin/categories/:id
router.put("/categories/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const { name, description, image } = req.body;
    const update: Record<string, unknown> = {};
    if (name !== undefined) { update.name = name; update.slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
    if (description !== undefined) update.description = description;
    if (image !== undefined) update.image = image;
    const cat = await Category.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!cat) { res.status(404).json({ error: "Category not found" }); return; }
    res.json(cat);
  } catch (err: any) {
    res.status(500).json({ error: err?.message ?? "Failed to update category" });
  }
});

// DELETE /api/admin/categories/:id
router.delete("/categories/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const cat = await Category.findByIdAndDelete(req.params.id);
    if (!cat) { res.status(404).json({ error: "Category not found" }); return; }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete category" });
  }
});

// ─── ORDERS (read + status update) ──────────────────────────────────────────

router.get("/orders", requireAdmin, async (req: Request, res: Response) => {
  try {
    const { page = "1", limit = "20", status } = req.query;
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const filter: Record<string, unknown> = {};
    if (status) filter.status = status;
    const total = await Order.countDocuments(filter);
    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .lean();
    res.json({ orders, total, page: pageNum, pages: Math.ceil(total / limitNum) });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

router.patch("/orders/:id/status", requireAdmin, async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) { res.status(404).json({ error: "Order not found" }); return; }
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Failed to update order" });
  }
});

// ─── LEADS ───────────────────────────────────────────────────────────────────

router.get("/leads", requireAdmin, async (req: Request, res: Response) => {
  try {
    const { Lead } = await import("../models/Lead.js");
    const { page = "1", limit = "20" } = req.query;
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    
    const total = await Lead.countDocuments();
    const leads = await Lead.find()
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .lean();
      
    res.json({ leads, total, page: pageNum, pages: Math.ceil(total / limitNum) });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch leads" });
  }
});

// POST /api/admin/upload
router.post("/upload", requireAdmin, async (req: Request, res: Response) => {
  try {
    const { name, data } = req.body;
    if (!data || typeof data !== "string") {
      res.status(400).json({ error: "Image data is required and must be a base64 string" });
      return;
    }

    const matches = data.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
    if (!matches) {
      res.status(400).json({ error: "Invalid base64 image data format" });
      return;
    }

    const ext = "." + (matches[1] === "jpeg" ? "jpg" : matches[1]);
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, "base64");

    const uploadsDir = path.resolve(process.cwd(), "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const fileName = `upload_${Date.now()}_${Math.random().toString(36).substring(2, 8)}${ext}`;
    const filePath = path.join(uploadsDir, fileName);

    await fs.promises.writeFile(filePath, buffer);

    res.json({ url: `/api/uploads/${fileName}` });
  } catch (err: any) {
    res.status(500).json({ error: err?.message ?? "Failed to upload image" });
  }
});


// ─── CMS CONTENT CRUD ─────────────────────────────────────────────────────────

router.get("/content/:type", requireAdmin, async (req: Request, res: Response) => {
  try {
    const { type } = req.params;
    const content = await Content.findOne({ type });
    if (!content) {
      res.status(404).json({ error: "Content not found" });
      return;
    }
    res.json(content.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch content" });
  }
});

router.put("/content/:type", requireAdmin, async (req: Request, res: Response) => {
  try {
    const { type } = req.params;
    const data = req.body;
    
    let content = await Content.findOne({ type });
    if (content) {
      content.data = data;
      await content.save();
    } else {
      content = new Content({ type, data });
      await content.save();
    }
    res.json(content.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to update content" });
  }
});

// ─── BLOG CRUD ───────────────────────────────────────────────────────────────

router.get("/blog", requireAdmin, async (req: Request, res: Response) => {
  try {
    const posts = await BlogPost.find().sort({ createdAt: -1 }).lean();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blog posts" });
  }
});

router.post("/blog", requireAdmin, async (req: Request, res: Response) => {
  try {
    const { title, content, excerpt, category, imageUrl, readTime, isPublished } = req.body;
    if (!title || !content) {
      res.status(400).json({ error: "Title and content are required" });
      return;
    }
    
    let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    // Check if slug exists
    const existing = await BlogPost.findOne({ slug });
    if (existing) {
      slug += "-" + Date.now();
    }

    const post = new BlogPost({
      title, slug, content, excerpt, category, imageUrl, readTime, isPublished
    });
    await post.save();
    res.status(201).json(post);
  } catch (err: any) {
    res.status(500).json({ error: err?.message ?? "Failed to create blog post" });
  }
});

router.put("/blog/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const update = req.body;
    // Don't allow changing slug directly here for simplicity, or handle if title changes
    if (update.title) {
       // Optional: update slug if title changes
    }
    
    const post = await BlogPost.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!post) {
      res.status(404).json({ error: "Blog post not found" });
      return;
    }
    res.json(post);
  } catch (err: any) {
    res.status(500).json({ error: err?.message ?? "Failed to update blog post" });
  }
});

router.delete("/blog/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) {
      res.status(404).json({ error: "Blog post not found" });
      return;
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete blog post" });
  }
});
export default router;
