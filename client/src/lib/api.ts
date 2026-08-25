// Storefront API helper

const BASE = "/api";

export function getSessionId(): string {
  let sessionId = localStorage.getItem("anvi_session_id");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("anvi_session_id", sessionId);
  }
  return sessionId;
}

export async function fetchFeaturedProducts() {
  const res = await fetch(`${BASE}/products/featured`);
  if (!res.ok) throw new Error("Failed to fetch featured products");
  return res.json();
}

export async function fetchSaleProducts() {
  const res = await fetch(`${BASE}/products/sale`);
  if (!res.ok) throw new Error("Failed to fetch sale products");
  return res.json();
}

export async function fetchProducts(params?: { page?: number; limit?: number; category?: string; collection?: string; occasion?: string; search?: string }) {
  const q = new URLSearchParams();
  if (params?.page) q.set("page", String(params.page));
  if (params?.limit) q.set("limit", String(params.limit));
  if (params?.category) q.set("category", params.category);
  if (params?.collection) q.set("collection", params.collection);
  if (params?.occasion) q.set("occasion", params.occasion);
  if (params?.search) q.set("search", params.search);
  const res = await fetch(`${BASE}/products?${q}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchProductBySlug(slug: string) {
  const res = await fetch(`${BASE}/products/${slug}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export async function fetchCategories() {
  const res = await fetch(`${BASE}/products/categories/all`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function fetchAnviEdit() {
  const res = await fetchProducts({ collection: "the-anvi-edit", limit: 4 });
  return res.products || [];
}

export async function fetchNewArrivals() {
  const res = await fetchProducts({ category: "new-arrivals", limit: 4 });
  return res.products || [];
}

export async function fetchNivethasPicks() {
  const res = await fetchProducts({ collection: "nivethas-picks", limit: 4 });
  return res.products || [];
}

export async function fetchBestsellers() {
  const res = await fetchProducts({ collection: "bestsellers", limit: 4 });
  return res.products || [];
}

// Store Content (CMS) API
export async function fetchStoreContent(type: string) {
  const res = await fetch(`${BASE}/store/content/${type}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch content");
  return res.json();
}

// Blog API
export async function fetchBlogPosts() {
  const res = await fetch(`${BASE}/store/blog`);
  if (!res.ok) throw new Error("Failed to fetch blog posts");
  return res.json();
}

export async function fetchBlogPostBySlug(slug: string) {
  const res = await fetch(`${BASE}/store/blog/${slug}`);
  if (!res.ok) throw new Error("Failed to fetch blog post");
  return res.json();
}

// Cart API
export async function getCart() {
  const sessionId = getSessionId();
  const res = await fetch(`${BASE}/cart?sessionId=${sessionId}`);
  if (!res.ok) throw new Error("Failed to fetch cart");
  return res.json();
}

export async function addToCartApi(productId: string, quantity: number, size: string, color?: string | null) {
  const sessionId = getSessionId();
  const res = await fetch(`${BASE}/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId, productId, quantity, size, color }),
  });
  if (!res.ok) throw new Error("Failed to add to cart");
  return res.json();
}

export async function updateCartItemApi(itemId: string, quantity: number) {
  const sessionId = getSessionId();
  const res = await fetch(`${BASE}/cart/${itemId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId, quantity }),
  });
  if (!res.ok) throw new Error("Failed to update cart item");
  return res.json();
}

export async function removeCartItemApi(itemId: string) {
  const sessionId = getSessionId();
  const res = await fetch(`${BASE}/cart/${itemId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId }),
  });
  if (!res.ok) throw new Error("Failed to remove cart item");
  return res.json();
}

// Orders API
export async function submitOrder(orderData: any) {
  const sessionId = getSessionId();
  const res = await fetch(`${BASE}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...orderData, sessionId }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Failed to submit order");
  }
  return data;
}

export async function validateCoupon(code: string, sessionId: string) {
  const res = await fetch(`${BASE}/coupons/validate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, sessionId }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to validate coupon");
  }
  return res.json();
}

export async function fetchOrder(orderNumber: string) {
  const res = await fetch(`${BASE}/orders/${orderNumber}`);
  if (!res.ok) throw new Error("Failed to fetch order");
  return res.json();
}

export async function fetchUserOrders() {
  const sessionId = getSessionId();
  // Pass sessionId or token if logged in
  const res = await fetch(`${BASE}/orders?sessionId=${sessionId}`);
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
}

// Auth API Placeholders
export async function loginApi(email: string, password?: string) {
  // Replace with real backend call
  const res = await fetch(`${BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Invalid credentials");
  }
  return res.json();
}

export async function registerApi(name: string, email: string, password?: string, phone?: string) {
  const res = await fetch(`${BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, phone }),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Registration failed");
  }
  return res.json();
}

export async function forgotPasswordApi(email: string) {
  const res = await fetch(`${BASE}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to process request");
  }
  return res.json();
}

export async function updateProfileApi(updates: any) {
  const res = await fetch(`${BASE}/auth/profile`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error("Failed to update profile");
  return res.json();
}

export async function fetchSessionApi() {
  const res = await fetch(`${BASE}/auth/session`);
  if (!res.ok) throw new Error("No active session");
  return res.json();
}

export async function logoutApi() {
  const res = await fetch(`${BASE}/auth/logout`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to logout");
  return res.json();
}

// Wishlist API Placeholders
export async function fetchWishlistApi() {
  const sessionId = getSessionId();
  const res = await fetch(`${BASE}/wishlist?sessionId=${sessionId}`);
  if (!res.ok) throw new Error("Failed to fetch wishlist");
  return res.json();
}

export async function addToWishlistApi(productId: string) {
  const sessionId = getSessionId();
  const res = await fetch(`${BASE}/wishlist`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId, productId }),
  });
  if (!res.ok) throw new Error("Failed to add to wishlist");
  return res.json();
}

export async function removeFromWishlistApi(productId: string) {
  const sessionId = getSessionId();
  const res = await fetch(`${BASE}/wishlist/${productId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId }),
  });
  if (!res.ok) throw new Error("Failed to remove from wishlist");
  return res.json();
}
