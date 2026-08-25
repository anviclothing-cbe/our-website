import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Upload } from "lucide-react";
import { getAdminCategories, createCategory, updateCategory, deleteCategory, getAdminToken } from "@/lib/adminApi";
import { Category } from "./types";

const MAROON = "var(--brand-primary)";
function goldenBtn(extra = "") { return `px-4 py-2 rounded text-white text-sm font-semibold transition-all hover:opacity-90 ${extra}`; }
// ─── Categories Tab ───────────────────────────────────────────────────────────

function CategoriesTab() {
  const [cats, setCats] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; cat?: Category | null }>({ open: false });
  const [form, setForm] = useState({ name: "", description: "", image: "" });
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    getAdminCategories().then(setCats).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const openModal = (cat?: Category | null) => {
    setForm({ name: cat?.name ?? "", description: cat?.description ?? "", image: cat?.image ?? "" });
    setModal({ open: true, cat });
  };

  const [uploadingCatImage, setUploadingCatImage] = useState(false);

  const handleCategoryImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];

    const validTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      alert("Only .png, .jpeg, and .jpg images are allowed.");
      return;
    }

    setUploadingCatImage(true);
    try {
      const reader = new FileReader();
      const base64String = await new Promise<string>((resolve, reject) => {
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
      setForm((f) => ({ ...f, image: data.url }));
    } catch (err: any) {
      alert(err.message ?? "Failed to upload image");
    } finally {
      setUploadingCatImage(false);
      e.target.value = "";
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (modal.cat) await updateCategory(modal.cat._id, form);
      else await createCategory(form);
      setModal({ open: false });
      load();
    } catch {} finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    try { await deleteCategory(id); load(); } catch {} finally { setDeleteId(null); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground" >Categories</h1>
        <button onClick={() => openModal(null)}
          className={goldenBtn("flex items-center gap-2")}
          style={{ background: `linear-gradient(135deg, ${MAROON}, var(--color-anvi-maroon-deep, #5c1828))`, boxShadow: `0 4px 15px rgba(206,165,59,0.3)` }}>
          <Plus size={16} /> Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? [...Array(6)].map((_, i) => (
          <div key={i} className="h-32 rounded-xl bg-secondary animate-pulse" />
        )) : cats.map((cat) => (
          <div key={cat._id} className="bg-card rounded-xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            {cat.image ? (
              <div className="h-28 overflow-hidden">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="h-28 flex items-center justify-center" style={{ background: "linear-gradient(135deg, var(--color-anvi-ivory), var(--color-anvi-beige))" }}>
                <span className="text-4xl font-bold" style={{ color: MAROON }}>{cat.name.charAt(0)}</span>
              </div>
            )}
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-foreground">{cat.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{cat.productCount ?? 0} products</p>
                </div>
                <div className="flex gap-1.5 mt-0.5">
                  <button onClick={() => openModal(cat)} className="p-1.5 hover:bg-surface text-brand-primary rounded-lg transition-colors"><Pencil size={14} /></button>
                  <button onClick={() => setDeleteId(cat._id)} className="p-1.5 hover:bg-error-bg text-error rounded-lg transition-colors"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Category modal */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="bg-card rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="font-bold text-foreground font-serif text-xl">{modal.cat ? "Edit Category" : "Add Category"}</h2>
              <button onClick={() => setModal({ open: false })} className="p-1.5 hover:bg-secondary rounded-lg"><X size={18} /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Name *</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400" />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Description</label>
                <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400" />
              </div>
              <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Image URL</label>
                  <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Upload Image File <span className="text-muted-foreground">(.png, .jpg, .jpeg)</span>
                  </label>
                  <div className="relative border border-dashed border-border-strong rounded-lg px-3 py-2 text-center hover:border-yellow-400 transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[42px] bg-secondary/50">
                    <input type="file" accept=".png,.jpg,.jpeg" onChange={handleCategoryImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                    <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                      <Upload size={14} /> {uploadingCatImage ? "Uploading..." : "Choose File"}
                    </span>
                  </div>
                </div>
              </div>
              {form.image && <img src={form.image} alt="" className="mt-2 h-24 w-full object-cover rounded-lg border border-border" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />}
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setModal({ open: false })} className="flex-1 py-2.5 border border-border rounded-lg text-sm font-medium hover:bg-secondary">Cancel</button>
                <button type="submit" disabled={saving}
                  className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-white"
                  style={{ background: `linear-gradient(135deg, ${MAROON}, var(--color-anvi-maroon-deep, #5c1828))` }}>
                  {saving ? "Saving..." : modal.cat ? "Update" : "Add Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="bg-card rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl text-center">
            <div className="w-14 h-14 bg-error-bg rounded-full flex items-center justify-center mx-auto mb-3">
              <Trash2 size={24} className="text-error" />
            </div>
            <h3 className="font-bold text-foreground font-serif text-xl mb-1">Delete Category?</h3>
            <p className="text-muted-foreground text-sm mb-4">This will not delete existing products.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 border border-border rounded-lg text-sm font-medium hover:bg-secondary">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2.5 bg-error text-white rounded-lg text-sm font-semibold hover:bg-error">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default CategoriesTab;
