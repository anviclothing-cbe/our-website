import { Router, type Request, type Response } from "express";
import { Coupon } from "../models/Coupon.js";
import { Product } from "../models/Product.js";
import { Cart } from "../models/Cart.js";

const router = Router();

// POST /api/coupons/validate
router.post("/validate", async (req: Request, res: Response) => {
  try {
    const { code, sessionId } = req.body;
    if (!code || !sessionId) {
      res.status(400).json({ error: "Coupon code and sessionId are required" });
      return;
    }

    const cart = await Cart.findOne({ sessionId });
    if (!cart || cart.items.length === 0) {
      res.status(400).json({ error: "Cart is empty" });
      return;
    }

    const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });
    if (!coupon) {
      res.status(404).json({ error: "This coupon is invalid or inactive" });
      return;
    }

    if (coupon.expiryDate && new Date(coupon.expiryDate) < new Date()) {
      res.status(400).json({ error: "This coupon has expired" });
      return;
    }

    // Verify minimum order value against overall subtotal
    let totalSubtotal = 0;
    
    // We need to fetch current products to verify categories and prices
    const cartProducts = [];
    for (const item of cart.items) {
      const product = await Product.findById(item.productId).lean();
      if (!product || !product.inStock) {
        res.status(400).json({ error: `Product "${item.name}" is no longer available.` });
        return;
      }
      totalSubtotal += product.price * item.quantity;
      cartProducts.push({
        ...item.toObject(),
        category: product.category,
        productIdStr: product._id.toString()
      });
    }

    if (coupon.minimumOrderValue && totalSubtotal < coupon.minimumOrderValue) {
      res.status(400).json({ 
        error: `This coupon requires a minimum order of ₹${coupon.minimumOrderValue}` 
      });
      return;
    }

    // Calculate applicable subtotal
    let applicableSubtotal = 0;
    const hasCategoryRestriction = coupon.validCategories && coupon.validCategories.length > 0;
    const hasProductRestriction = coupon.validProducts && coupon.validProducts.length > 0;

    if (!hasCategoryRestriction && !hasProductRestriction) {
      applicableSubtotal = totalSubtotal;
    } else {
      for (const item of cartProducts) {
        let isApplicable = false;
        
        if (hasCategoryRestriction && coupon.validCategories!.includes(item.category)) {
          isApplicable = true;
        }
        
        if (hasProductRestriction && coupon.validProducts!.includes(item.productIdStr)) {
          isApplicable = true;
        }

        if (isApplicable) {
          applicableSubtotal += item.price * item.quantity;
        }
      }
    }

    if (applicableSubtotal === 0) {
      res.status(400).json({ error: "This coupon does not apply to any items in your cart" });
      return;
    }

    // Calculate discount
    let discount = 0;
    if (coupon.discountType === "percentage") {
      discount = Math.floor(applicableSubtotal * (coupon.discountValue / 100));
    } else if (coupon.discountType === "fixed") {
      discount = Math.min(coupon.discountValue, applicableSubtotal); // Can't discount more than subtotal
    }

    res.json({
      success: true,
      message: `Coupon applied: ₹${discount} off!`,
      code: coupon.code,
      discount
    });

  } catch (err) {
    req.log.error({ err }, "Error validating coupon");
    res.status(500).json({ error: "Failed to validate coupon" });
  }
});

export default router;
