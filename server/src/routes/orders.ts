import { Router, type Request, type Response } from "express";
import { Order } from "../models/Order.js";
import { Cart } from "../models/Cart.js";
import { Product } from "../models/Product.js";
import { Coupon } from "../models/Coupon.js";

const router = Router();

// POST /api/orders — place an order (checkout)
router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      sessionId,
      customerName,
      customerEmail,
      customerPhone,
      address,
      paymentMethod,
      notes,
      shipping = 0,
      couponCode,
    } = req.body;

    if (!sessionId || !customerName || !customerEmail || !customerPhone || !address || !paymentMethod) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    // Fetch cart
    const cart = await Cart.findOne({ sessionId });
    if (!cart || cart.items.length === 0) {
      res.status(400).json({ error: "Cart is empty" });
      return;
    }

    // Verify products, prices, and stock
    let calculatedSubtotal = 0;
    const validatedItems = [];
    const cartProductsForCoupon: any[] = [];

    for (const item of cart.items) {
      const product = await Product.findById(item.productId).lean();
      
      if (!product) {
        res.status(400).json({ error: `Product "${item.name}" is no longer available.` });
        return;
      }
      
      if (!product.inStock) {
        res.status(400).json({ error: `Product "${item.name}" is out of stock.` });
        return;
      }

      if (product.price !== item.price) {
        res.status(400).json({ 
          error: `The price of "${item.name}" has changed from ₹${item.price} to ₹${product.price}. Please refresh your cart.` 
        });
        return;
      }

      calculatedSubtotal += product.price * item.quantity;
      cartProductsForCoupon.push({
        price: product.price,
        quantity: item.quantity,
        category: product.category,
        productIdStr: product._id.toString(),
      });
      validatedItems.push({
        productId: item.productId,
        name: product.name,
        price: product.price,
        image: product.images[0] || item.image,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
      });
    }

    let calculatedDiscount = 0;
    let validatedCouponCode = undefined;

    if (couponCode) {
      const coupon = await Coupon.findOne({ code: couponCode.toUpperCase(), isActive: true });
      
      if (!coupon) {
        res.status(400).json({ error: "The applied coupon is invalid or inactive." });
        return;
      }

      if (coupon.expiryDate && new Date(coupon.expiryDate) < new Date()) {
        res.status(400).json({ error: "The applied coupon has expired." });
        return;
      }

      if (coupon.minimumOrderValue && calculatedSubtotal < coupon.minimumOrderValue) {
        res.status(400).json({ error: `The applied coupon requires a minimum order of ₹${coupon.minimumOrderValue}.` });
        return;
      }

      let applicableSubtotal = 0;
      const hasCategoryRestriction = coupon.validCategories && coupon.validCategories.length > 0;
      const hasProductRestriction = coupon.validProducts && coupon.validProducts.length > 0;

      if (!hasCategoryRestriction && !hasProductRestriction) {
        applicableSubtotal = calculatedSubtotal;
      } else {
        for (const cp of cartProductsForCoupon) {
          let isApplicable = false;
          if (hasCategoryRestriction && coupon.validCategories!.includes(cp.category)) isApplicable = true;
          if (hasProductRestriction && coupon.validProducts!.includes(cp.productIdStr)) isApplicable = true;
          
          if (isApplicable) applicableSubtotal += cp.price * cp.quantity;
        }
      }

      if (applicableSubtotal > 0) {
        if (coupon.discountType === "percentage") {
          calculatedDiscount = Math.floor(applicableSubtotal * (coupon.discountValue / 100));
        } else if (coupon.discountType === "fixed") {
          calculatedDiscount = Math.min(coupon.discountValue, applicableSubtotal);
        }
        validatedCouponCode = coupon.code;
      } else {
        res.status(400).json({ error: "The applied coupon does not apply to any items in your cart." });
        return;
      }
    }

    const calculatedTotal = calculatedSubtotal - calculatedDiscount + shipping;
    const orderNumber = `ANVI-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const order = new Order({
      orderNumber,
      customerName,
      customerEmail,
      customerPhone,
      address,
      items: validatedItems,
      subtotal: calculatedSubtotal,
      discount: calculatedDiscount,
      shipping,
      total: calculatedTotal,
      couponCode: validatedCouponCode,
      paymentMethod,
      notes,
      sessionId,
      status: "pending",
    });

    await order.save();

    // Clear cart after placing order
    cart.items = [] as typeof cart.items;
    await cart.save();

    res.status(201).json({ orderNumber: order.orderNumber, _id: order._id, total: order.total });
  } catch (err: any) {
    res.status(500).json({ error: err?.message ?? "Failed to place order" });
  }
});

// GET /api/orders — fetch all orders for a session
router.get("/", async (req: Request, res: Response) => {
  try {
    const sessionId = req.query.sessionId as string;
    if (!sessionId) {
      res.status(400).json({ error: "Missing sessionId" });
      return;
    }
    const orders = await Order.find({ sessionId }).sort({ createdAt: -1 }).lean();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// GET /api/orders/:orderNumber — track an order
router.get("/:orderNumber", async (req: Request, res: Response) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber }).lean();
    if (!order) { res.status(404).json({ error: "Order not found" }); return; }
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch order" });
  }
});

export default router;
