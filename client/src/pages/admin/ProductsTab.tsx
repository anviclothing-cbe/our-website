import { useState, useCallback, useEffect } from "react";
import { Plus, Search, Check, Pencil, Trash2, Upload, AlertCircle, X, ChevronLeft, ChevronRight } from "lucide-react";
import { getAdminProducts, createProduct, updateProduct, deleteProduct, getAdminCategories, getAdminToken } from "@/lib/adminApi";
import { Product, Category } from "./types";
import { useCurrency } from "@/contexts/CurrencyContext";

const MAROON = "var(--brand-primary)";
function goldenBtn(extra = "") { return `px-4 py-2 rounded text-white text-sm font-semibold transition-all hover:opacity-90 ${extra}`; }

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: "bg-warning-bg text-warning",
    confirmed: "bg-info-bg text-info",
    shipped: "bg-surface-dark text-text-on-dark",
    delivered: "bg-success-bg text-success",
    cancelled: "bg-error-bg text-error",
  };
  return <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${map[status] ?? "bg-secondary text-foreground"}`}>{status}</span>;
}

// ─── Product Form Modal ───────────────────────────────────────────────────────

const ALL_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "Free Size"];
const ALL_COLLECTIONS = [
  { id: "the-anvi-edit", label: "The ANVI Edit" },
  { id: "nivethas-picks", label: "Nivetha's Picks" },
  { id: "bestsellers", label: "Bestsellers" },
  { id: "everyday-edit", label: "Everyday Edit" },
  { id: "office-edit", label: "Office Edit" },
  { id: "festive-edit", label: "Festive Edit" },
];
const ALL_OCCASIONS = [
  { id: "everyday", label: "Everyday" },
  { id: "office", label: "Office" },
  { id: "festive", label: "Festive" },
  { id: "premium", label: "Premium" },
];

function ProductFormModal({
  product, categories, onClose, onSaved,
}: {
  product?: Product | null;
  categories: Category[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = !!product;
  const [form, setForm] = useState({
    name: product?.name ?? "",
    description: product?.description ?? "",
    price: String(product?.price ?? ""),
    originalPrice: String(product?.originalPrice ?? ""),
    discount: String(product?.discount ?? ""),
    category: product?.category ?? (categories[0]?.slug ?? ""),
    fabric: product?.fabric ?? "",
    sizes: product?.sizes ?? [],
    inStock: product?.inStock ?? true,
    featured: product?.featured ?? false,
    onSale: product?.onSale ?? false,
    tags: (product?.tags ?? []).join(", "),
    collections: product?.collections ?? [],
    occasions: product?.occasions ?? [],
    imageUrls: (product?.images ?? []).join("\n"),
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [uploadingProdImage, setUploadingProdImage] = useState(false);

  const handleProductImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const validTypes = ["image/png", "image/jpeg", "image/jpg"];
    const fileArray = Array.from(files);

    const invalidFiles = fileArray.filter((f) => !validTypes.includes(f.type));
    if (invalidFiles.length > 0) {
      alert("Some files were skipped. Only .png, .jpeg, and .jpg images are allowed.");
    }
    const targetFiles = fileArray.filter((f) => validTypes.includes(f.type));
    if (targetFiles.length === 0) return;

    setUploadingProdImage(true);
    try {
      const urls: string[] = [];
      for (const file of targetFiles) {
        const base64String = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        const res = await fetch("/api/admin/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-admin-token": getAdminToken() ?? "",
          },
          body: JSON.stringify({ name: file.name, data: base64String }),
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error ?? "Upload failed");
        }
        const data = await res.json();
        urls.push(data.url);
      }

      setForm((f) => {
        const current = f.imageUrls.split("\n").filter(Boolean);
        const updated = [...current, ...urls].join("\n");
        return { ...f, imageUrls: updated };
      });
    } catch (err: any) {
      alert(err.message ?? "Failed to upload image(s)");
    } finally {
      setUploadingProdImage(false);
      e.target.value = "";
    }
  };

  const toggleSize = (s: string) =>
    setForm((f) => ({ ...f, sizes: f.sizes.includes(s) ? f.sizes.filter((x) => x !== s) : [...f.sizes, s] }));

  const toggleCollection = (c: string) =>
    setForm((f) => ({ ...f, collections: f.collections.includes(c) ? f.collections.filter((x) => x !== c) : [...f.collections, c] }));

  const toggleOccasion = (o: string) =>
    setForm((f) => ({ ...f, occasions: f.occasions.includes(o) ? f.occasions.filter((x) => x !== o) : [...f.occasions, o] }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const images = form.imageUrls.split("\n").map((u) => u.trim()).filter(Boolean);
      const data = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
        discount: form.discount ? Number(form.discount) : undefined,
        images,
        category: form.category,
        fabric: form.fabric,
        sizes: form.sizes,
        inStock: form.inStock,
        featured: form.featured,
        onSale: form.onSale,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        collections: form.collections,
        occasions: form.occasions,
      };
      if (isEdit && product) await updateProduct(product._id, data);
      else await createProduct(data);
      onSaved();
    } catch (err: any) {
      setError(err.message ?? "Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-8 px-4" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="bg-card rounded-2xl w-full max-w-2xl shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="font-bold text-foreground font-serif text-xl">{isEdit ? "Edit Product" : "Add New Product"}</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-secondary rounded-lg"><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {error && <div className="p-3 rounded-lg text-sm text-error bg-error-bg border border-error flex gap-2"><AlertCircle size={16} />{error}</div>}

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-medium text-muted-foreground mb-1">Product Name *</label>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-muted-foreground mb-1">Description</label>
              <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Price (₹) *</label>
              <input required type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Original Price (₹)</label>
              <input type="number" value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Category *</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400">
                {categories.map((c) => <option key={c._id} value={c.slug}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Fabric</label>
              <input value={form.fabric} onChange={(e) => setForm({ ...form, fabric: e.target.value })}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400" />
            </div>
          </div>

          {/* Image URLs & Upload */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                Image URLs <span className="text-muted-foreground">(one per line — 1st is primary)</span>
              </label>
              <textarea rows={4} value={form.imageUrls} onChange={(e) => setForm({ ...form, imageUrls: e.target.value })}
                placeholder={"https://example.com/image1.jpg\nhttps://example.com/image2.jpg"}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none font-mono text-xs" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                Upload Image Files <span className="text-muted-foreground">(.png, .jpg, .jpeg)</span>
              </label>
              <div className="border border-dashed border-border-strong rounded-lg h-[92px] hover:border-yellow-400 transition-colors flex flex-col items-center justify-center relative cursor-pointer bg-secondary/50">
                <input type="file" multiple accept=".png,.jpg,.jpeg" onChange={handleProductImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                <Upload size={20} className="text-muted-foreground mb-1" />
                <span className="text-xs text-muted-foreground font-medium">{uploadingProdImage ? "Uploading..." : "Click or Drag to Upload"}</span>
                <span className="text-[10px] text-muted-foreground mt-0.5">Multiple files supported</span>
              </div>
            </div>
          </div>
          {/* Preview */}
          {form.imageUrls.split("\n").filter(Boolean).length > 0 && (
            <div className="flex gap-2 mt-2 flex-wrap">
              {form.imageUrls.split("\n").map((u, i) => u.trim() && (
                <div key={i} className="relative">
                  <img src={u.trim()} alt="" className="w-16 h-16 object-cover rounded-lg border border-border" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  {i === 0 && <span className="absolute -top-1 -right-1 text-[9px] bg-warning text-white rounded-full px-1 font-bold">1st</span>}
                </div>
              ))}
            </div>
          )}

          {/* Sizes */}
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-2">Sizes</label>
            <div className="flex flex-wrap gap-2">
              {ALL_SIZES.map((s) => (
                <button key={s} type="button" onClick={() => toggleSize(s)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all"
                  style={form.sizes.includes(s)
                    ? { background: MAROON, borderColor: MAROON, color: "#fff" }
                    : { background: "transparent", borderColor: "#e5e7eb", color: "#6b7280" }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Tags <span className="text-muted-foreground">(comma-separated)</span></label>
            <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })}
              placeholder="salwar, cotton, summer"
              className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400" />
          </div>

          {/* Homepage Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-2">Collections</label>
              <div className="flex flex-wrap gap-2">
                {ALL_COLLECTIONS.map((c) => (
                  <button key={c.id} type="button" onClick={() => toggleCollection(c.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all"
                    style={form.collections.includes(c.id)
                      ? { background: MAROON, borderColor: MAROON, color: "#fff" }
                      : { background: "transparent", borderColor: "#e5e7eb", color: "#6b7280" }}>
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-2">Occasions</label>
              <div className="flex flex-wrap gap-2">
                {ALL_OCCASIONS.map((o) => (
                  <button key={o.id} type="button" onClick={() => toggleOccasion(o.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all"
                    style={form.occasions.includes(o.id)
                      ? { background: MAROON, borderColor: MAROON, color: "#fff" }
                      : { background: "transparent", borderColor: "#e5e7eb", color: "#6b7280" }}>
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Toggles */}
          <div className="flex gap-6">
            {[["inStock", "In Stock"], ["featured", "Featured"], ["onSale", "On Sale"]].map(([key, label]) => (
              <label key={key} className="flex items-center gap-2 text-sm cursor-pointer select-none">
                <div onClick={() => setForm({ ...form, [key]: !(form as any)[key] })}
                  className="w-10 h-5 rounded-full flex items-center transition-all px-0.5"
                  style={{ background: (form as any)[key] ? MAROON : "#e5e7eb" }}>
                  <div className="w-4 h-4 bg-card rounded-full shadow transition-all" style={{ marginLeft: (form as any)[key] ? "20px" : "0" }} />
                </div>
                <span className="text-muted-foreground">{label}</span>
              </label>
            ))}
          </div>

          <div className="flex gap-3 pt-2 border-t border-border">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-border rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary">Cancel</button>
            <button type="submit" disabled={saving}
              className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-white transition-all"
              style={{ background: `linear-gradient(135deg, ${MAROON}, var(--color-anvi-maroon-deep, #5c1828))` }}>
              {saving ? "Saving..." : isEdit ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Products Table ───────────────────────────────────────────────────────────

function ProductsTab() {
  const { formatPrice } = useCurrency();
  const [data, setData] = useState<{ products: Product[]; total: number; pages: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [modal, setModal] = useState<{ open: boolean; product?: Product | null }>({ open: false });
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    Promise.all([
      getAdminProducts({ page, limit: 15, search: search || undefined }),
      getAdminCategories(),
    ]).then(([p, c]) => { setData(p); setCategories(c); }).finally(() => setLoading(false));
  }, [page, search]);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (id: string) => {
    setDeleting(true);
    try { await deleteProduct(id); load(); } catch {} finally { setDeleting(false); setDeleteId(null); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground" >Products</h1>
        <button onClick={() => setModal({ open: true, product: null })}
          className={goldenBtn("flex items-center gap-2")}
          style={{ background: `linear-gradient(135deg, ${MAROON}, var(--color-anvi-maroon-deep, #5c1828))`, boxShadow: `0 4px 15px rgba(206,165,59,0.3)` }}>
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Search */}
      <div className="mb-4 relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { setSearch(searchInput); setPage(1); } }}
          placeholder="Search products… (press Enter)"
          className="w-full pl-9 pr-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400" />
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary text-xs text-muted-foreground uppercase">
                <th className="px-4 py-3 text-left">Image</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-center">Stock</th>
                <th className="px-4 py-3 text-center">Featured</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(8)].map((_, i) => (
                  <tr key={i} className="border-t border-border/50">
                    <td colSpan={7} className="px-4 py-3"><div className="h-8 bg-secondary animate-pulse rounded" /></td>
                  </tr>
                ))
              ) : data?.products.map((p) => (
                <tr key={p._id} className="border-t border-border/50 hover:bg-secondary/50 transition-colors">
                  <td className="px-4 py-2.5">
                    <img src={p.images[0]} alt={p.name}
                      className="w-12 h-12 object-cover rounded-lg border border-border"
                      onError={(e) => { (e.target as HTMLImageElement).src = "/anvi_logo.png"; }} />
                  </td>
                  <td className="px-4 py-2.5">
                    <p className="font-medium text-foreground line-clamp-1">{p.name}</p>
                    {p.onSale && <span className="text-xs text-orange-500 font-medium">ON SALE</span>}
                  </td>
                  <td className="px-4 py-2.5 capitalize text-muted-foreground">{p.category.replace(/-/g, " ")}</td>
                  <td className="px-4 py-2.5 font-semibold text-foreground">{formatPrice(p.price)}</td>
                  <td className="px-4 py-2.5 text-center">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.inStock ? "bg-success-bg text-success" : "bg-error-bg text-error"}`}>
                      {p.inStock ? "In Stock" : "Out"}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    {p.featured ? <Check size={16} className="mx-auto text-success" /> : <span className="text-text-muted">—</span>}
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => setModal({ open: true, product: p })}
                        className="p-1.5 hover:bg-surface text-brand-primary rounded-lg transition-colors" title="Edit">
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => setDeleteId(p._id)}
                        className="p-1.5 hover:bg-error-bg text-error rounded-lg transition-colors" title="Delete">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && data?.products.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">No products found.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {data && data.pages > 1 && (
          <div className="flex items-center justify-between px-6 py-3 border-t border-border">
            <p className="text-xs text-muted-foreground">Showing {data.products.length} of {data.total} products</p>
            <div className="flex gap-2">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
                className="p-1.5 border border-border rounded-lg disabled:opacity-40 hover:bg-secondary"><ChevronLeft size={14} /></button>
              <span className="text-sm text-muted-foreground px-2 py-1">Page {page} of {data.pages}</span>
              <button disabled={page >= data.pages} onClick={() => setPage(p => p + 1)}
                className="p-1.5 border border-border rounded-lg disabled:opacity-40 hover:bg-secondary"><ChevronRight size={14} /></button>
            </div>
          </div>
        )}
      </div>

      {/* Product modal */}
      {modal.open && (
        <ProductFormModal
          product={modal.product}
          categories={categories}
          onClose={() => setModal({ open: false })}
          onSaved={() => { setModal({ open: false }); load(); }}
        />
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="bg-card rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl">
            <div className="text-center mb-4">
              <div className="w-14 h-14 bg-error-bg rounded-full flex items-center justify-center mx-auto mb-3">
                <Trash2 size={24} className="text-error" />
              </div>
              <h3 className="font-bold text-foreground font-serif text-xl">Delete Product?</h3>
              <p className="text-muted-foreground text-sm mt-1">This action cannot be undone.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 border border-border rounded-lg text-sm font-medium hover:bg-secondary">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} disabled={deleting}
                className="flex-1 py-2.5 bg-error text-white rounded-lg text-sm font-semibold hover:bg-error disabled:opacity-60">
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default ProductsTab;
