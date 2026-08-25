import { useState, useEffect } from "react";
import { Save, AlertCircle, Plus, Trash2, X, Edit, Upload } from "lucide-react";
import { getAdminContent, updateAdminContent, getAdminProducts, getAdminBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost, getAdminToken } from "@/lib/adminApi";

const MAROON = "var(--brand-primary)";

export default function CmsTab() {
  const [activeSection, setActiveSection] = useState<"hero" | "announcement" | "popup" | "blog" | "store_ambience">("announcement");
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [uploadingBanner, setUploadingBanner] = useState<number | null>(null);
  const [uploadingGallery, setUploadingGallery] = useState<number | null>(null);
  
  // Blog state
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [isEditingBlog, setIsEditingBlog] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const posts = await getAdminBlogPosts();
      setBlogPosts(posts);
    } catch (e) {
      console.error(e);
    }
  };


  useEffect(() => {
    if (activeSection !== "blog") {
      fetchContent(activeSection);
    } else {
      setContent(null);
    }
  }, [activeSection]);

  const fetchContent = async (type: string) => {
    setLoading(true);
    setMessage("");
    try {
      const data = await getAdminContent(type);
      setContent(data || getDefaultContent(type));
    } catch (e) {
      setContent(getDefaultContent(type));
    } finally {
      setLoading(false);
    }
  };

  const getDefaultContent = (type: string) => {
    if (type === "announcement") return { announcements: [{ message: "Summer Sale is Live! Get 20% Off", link: "/category/sale", isActive: true }] };
    if (type === "hero") return { banners: [{ titleStart: "Elegance", titleEnd: "Redefined", subtitle: "Discover the new festive collection.", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=1600", ctaText: "Shop Collection", ctaLink: "/category/new" }] };
    if (type === "popup") return { title: "Unlock 10% Off", subtitle: "Sign up to our newsletter and get 10% off your first order.", image: "", isActive: true };
    if (type === "store_ambience") return { heroTitle: "", heroSubtitle: "", heroImage: "", gallery: ["", "", ""] };
    return {};
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      await updateAdminContent(activeSection, content);
      setMessage("Content saved successfully!");
    } catch (e) {
      setMessage("Error saving content.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6 font-serif" >Content Management (CMS)</h1>
      
      <div className="flex gap-4 mb-6 border-b border-border">
        {[
          { id: "announcement", label: "Announcement Bar" },
          { id: "hero", label: "Hero Banner" },
          { id: "popup", label: "Edit Pop up" },
          { id: "blog", label: "Blog" },
          { id: "store_ambience", label: "Store Ambience" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id as any)}
            className={`pb-2 px-2 text-sm font-medium transition-colors ${activeSection === tab.id ? "border-b-2 text-foreground" : "text-muted-foreground hover:text-muted-foreground"}`}
            style={activeSection === tab.id ? { borderColor: MAROON } : {}}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg flex items-center gap-2 text-sm ${message.includes("Error") ? "bg-error-bg text-error" : "bg-success-bg text-success"}`}>
          <AlertCircle size={16} /> {message}
        </div>
      )}

      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-secondary rounded w-full max-w-md"></div>
          <div className="h-10 bg-secondary rounded w-full max-w-md"></div>
        </div>
      ) : content && (
        <div className="bg-card rounded-xl shadow-sm border border-border p-6 max-w-2xl">
          {activeSection === "announcement" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-foreground">Announcement Bars</h3>
                <button
                  onClick={() => setContent({ ...content, announcements: [...(content.announcements || []), { message: "New Announcement", link: "", isActive: true }] })}
                  className="flex items-center gap-2 text-sm text-white px-3 py-1.5 rounded"
                  style={{ background: MAROON }}
                >
                  <Plus size={14} /> Add Announcement
                </button>
              </div>

              {(content.announcements || []).map((ann: any, idx: number) => (
                <div key={idx} className="border border-border p-4 rounded-lg bg-secondary relative">
                  <button 
                    onClick={() => {
                      const newAnns = [...content.announcements];
                      newAnns.splice(idx, 1);
                      setContent({ ...content, announcements: newAnns });
                    }}
                    className="absolute top-4 right-4 text-error hover:text-error"
                  >
                    <Trash2 size={16} />
                  </button>
                  <h4 className="font-medium text-sm text-foreground mb-4">Announcement {idx + 1}</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Message</label>
                      <input
                        type="text" value={ann.message || ""}
                        onChange={(e) => {
                          const newAnns = [...content.announcements];
                          newAnns[idx].message = e.target.value;
                          setContent({ ...content, announcements: newAnns });
                        }}
                        className="w-full border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 bg-card"
                        style={{ ["--tw-ring-color" as string]: MAROON } as React.CSSProperties}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Link (Optional)</label>
                      <input
                        type="text" value={ann.link || ""}
                        onChange={(e) => {
                          const newAnns = [...content.announcements];
                          newAnns[idx].link = e.target.value;
                          setContent({ ...content, announcements: newAnns });
                        }}
                        className="w-full border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 bg-card"
                        style={{ ["--tw-ring-color" as string]: MAROON } as React.CSSProperties}
                      />
                    </div>
                    <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer mt-4">
                      <input 
                        type="checkbox" 
                        checked={ann.isActive || false} 
                        onChange={(e) => {
                          const newAnns = [...content.announcements];
                          newAnns[idx].isActive = e.target.checked;
                          setContent({ ...content, announcements: newAnns });
                        }} 
                      />
                      Active on site
                    </label>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === "hero" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-foreground">Hero Banners</h3>
                <button
                  onClick={() => setContent({ ...content, banners: [...(content.banners || []), { titleStart: "New", titleEnd: "Banner", subtitle: "", image: "", ctaText: "Shop Now", ctaLink: "/" }] })}
                  className="flex items-center gap-2 text-sm text-white px-3 py-1.5 rounded"
                  style={{ background: MAROON }}
                >
                  <Plus size={14} /> Add Banner
                </button>
              </div>
              
              {(content.banners || []).map((banner: any, idx: number) => (
                <div key={idx} className="border border-border p-4 rounded-lg bg-secondary relative">
                  <button 
                    onClick={() => {
                      const newBanners = [...content.banners];
                      newBanners.splice(idx, 1);
                      setContent({ ...content, banners: newBanners });
                    }}
                    className="absolute top-4 right-4 text-error hover:text-error"
                  >
                    <Trash2 size={16} />
                  </button>
                  <h4 className="font-medium text-sm text-foreground mb-4">Banner {idx + 1}</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Title Start (e.g. "The Everyday")</label>
                      <input
                        type="text" value={banner.titleStart || ""}
                        onChange={(e) => {
                          const newBanners = [...content.banners];
                          newBanners[idx].titleStart = e.target.value;
                          setContent({ ...content, banners: newBanners });
                        }}
                        className="w-full border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 bg-card"
                        style={{ ["--tw-ring-color" as string]: MAROON } as React.CSSProperties}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Title End (e.g. "Edit")</label>
                      <input
                        type="text" value={banner.titleEnd || ""}
                        onChange={(e) => {
                          const newBanners = [...content.banners];
                          newBanners[idx].titleEnd = e.target.value;
                          setContent({ ...content, banners: newBanners });
                        }}
                        className="w-full border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 bg-card"
                        style={{ ["--tw-ring-color" as string]: MAROON } as React.CSSProperties}
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-1">Subtitle</label>
                      <input
                        type="text" value={banner.subtitle || ""}
                        onChange={(e) => {
                          const newBanners = [...content.banners];
                          newBanners[idx].subtitle = e.target.value;
                          setContent({ ...content, banners: newBanners });
                        }}
                        className="w-full border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 bg-card"
                        style={{ ["--tw-ring-color" as string]: MAROON } as React.CSSProperties}
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-1">Background Image URL</label>
                      <div className="flex gap-2 items-center">
                        <input
                          type="text" value={banner.image || ""}
                          onChange={(e) => {
                            const newBanners = [...content.banners];
                            newBanners[idx].image = e.target.value;
                            setContent({ ...content, banners: newBanners });
                          }}
                          className="flex-1 border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 bg-card"
                          style={{ ["--tw-ring-color" as string]: MAROON } as React.CSSProperties}
                        />
                        <div className="relative">
                          <input 
                            type="file" 
                            accept=".png,.jpg,.jpeg" 
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            title="Upload an image"
                            onChange={async (e) => {
                              const files = e.target.files;
                              if (!files || files.length === 0) return;
                              const file = files[0];
                              const validTypes = ["image/png", "image/jpeg", "image/jpg"];
                              if (!validTypes.includes(file.type)) {
                                alert("Only .png, .jpeg, and .jpg images are allowed.");
                                return;
                              }
                              
                              setUploadingBanner(idx);
                              try {
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
                                const data = await res.json();
                                if (!res.ok) throw new Error(data.error || "Upload failed");
                                
                                const newBanners = [...content.banners];
                                newBanners[idx].image = data.url;
                                setContent({ ...content, banners: newBanners });
                              } catch (err: any) {
                                alert(err.message || "Failed to upload image");
                              } finally {
                                setUploadingBanner(null);
                                // reset file input
                                e.target.value = '';
                              }
                            }}
                          />
                          <button
                            type="button"
                            className="px-4 py-2 bg-secondary border border-border rounded-lg text-sm font-medium hover:bg-secondary/80 flex items-center gap-2 transition-colors whitespace-nowrap"
                          >
                            {uploadingBanner === idx ? (
                                <span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                            ) : (
                                <Upload size={16} />
                            )}
                            {uploadingBanner === idx ? "Uploading..." : "Upload"}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Button Text</label>
                      <input
                        type="text" value={banner.ctaText || ""}
                        onChange={(e) => {
                          const newBanners = [...content.banners];
                          newBanners[idx].ctaText = e.target.value;
                          setContent({ ...content, banners: newBanners });
                        }}
                        className="w-full border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 bg-card"
                        style={{ ["--tw-ring-color" as string]: MAROON } as React.CSSProperties}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Button Link</label>
                      <input
                        type="text" value={banner.ctaLink || ""}
                        onChange={(e) => {
                          const newBanners = [...content.banners];
                          newBanners[idx].ctaLink = e.target.value;
                          setContent({ ...content, banners: newBanners });
                        }}
                        className="w-full border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 bg-card"
                        style={{ ["--tw-ring-color" as string]: MAROON } as React.CSSProperties}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          
          {activeSection === "popup" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-foreground">Lead Capture Pop-up</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Title</label>
                  <input
                    type="text" value={content.title || ""}
                    onChange={(e) => setContent({ ...content, title: e.target.value })}
                    className="w-full border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 bg-card"
                    style={{ ["--tw-ring-color" as string]: MAROON } as React.CSSProperties}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Subtitle / Offer</label>
                  <input
                    type="text" value={content.subtitle || ""}
                    onChange={(e) => setContent({ ...content, subtitle: e.target.value })}
                    className="w-full border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 bg-card"
                    style={{ ["--tw-ring-color" as string]: MAROON } as React.CSSProperties}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Background Image URL</label>
                  <input
                    type="text" value={content.image || ""}
                    onChange={(e) => setContent({ ...content, image: e.target.value })}
                    className="w-full border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 bg-card"
                    style={{ ["--tw-ring-color" as string]: MAROON } as React.CSSProperties}
                  />
                </div>
                <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer mt-4">
                  <input 
                    type="checkbox" 
                    checked={content.isActive || false} 
                    onChange={(e) => setContent({ ...content, isActive: e.target.checked })} 
                  />
                  Active on site
                </label>
              </div>
            </div>
          )}

          {activeSection === "store_ambience" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-foreground">Store Ambience Images</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Hero Title</label>
                  <input
                    type="text" value={content.heroTitle || ""}
                    onChange={(e) => setContent({ ...content, heroTitle: e.target.value })}
                    placeholder="e.g. The ANVI Experience"
                    className="w-full border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 bg-card"
                    style={{ ["--tw-ring-color" as string]: MAROON } as React.CSSProperties}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Hero Subtitle</label>
                  <textarea
                    value={content.heroSubtitle || ""}
                    onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value })}
                    placeholder="e.g. Discover our handpicked collections..."
                    className="w-full border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 bg-card min-h-[80px]"
                    style={{ ["--tw-ring-color" as string]: MAROON } as React.CSSProperties}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Hero Image URL</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="text" value={content.heroImage || ""}
                      onChange={(e) => setContent({ ...content, heroImage: e.target.value })}
                      className="flex-1 border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 bg-card"
                      style={{ ["--tw-ring-color" as string]: MAROON } as React.CSSProperties}
                    />
                    <div className="relative">
                      <input 
                        type="file" 
                        accept=".png,.jpg,.jpeg" 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        title="Upload an image"
                        onChange={async (e) => {
                          const files = e.target.files;
                          if (!files || files.length === 0) return;
                          const file = files[0];
                          const validTypes = ["image/png", "image/jpeg", "image/jpg"];
                          if (!validTypes.includes(file.type)) return;
                          
                          setUploadingGallery(-1);
                          try {
                            const base64String = await new Promise<string>((resolve, reject) => {
                              const reader = new FileReader();
                              reader.onloadend = () => resolve(reader.result as string);
                              reader.onerror = reject;
                              reader.readAsDataURL(file);
                            });
                            
                            const res = await fetch("/api/admin/upload", {
                              method: "POST",
                              headers: { "Content-Type": "application/json", "x-admin-token": getAdminToken() ?? "" },
                              body: JSON.stringify({ name: file.name, data: base64String }),
                            });
                            const data = await res.json();
                            if (!res.ok) throw new Error(data.error);
                            
                            setContent({ ...content, heroImage: data.url });
                          } catch (err: any) {
                            alert(err.message || "Failed to upload");
                          } finally {
                            setUploadingGallery(null);
                            e.target.value = '';
                          }
                        }}
                      />
                      <button type="button" className="px-4 py-2 bg-secondary border border-border rounded-lg text-sm font-medium hover:bg-secondary/80 flex items-center gap-2">
                        {uploadingGallery === -1 ? <span className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" /> : <Upload size={16} />}
                        {uploadingGallery === -1 ? "Uploading" : "Upload"}
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-foreground mb-4 border-b border-border pb-2">Gallery Images (3 recommended)</h4>
                  {(content.gallery || ["", "", ""]).map((imgUrl: string, idx: number) => (
                    <div key={idx} className="mb-4">
                      <label className="block text-sm font-medium text-foreground mb-1">Gallery Image {idx + 1}</label>
                      <div className="flex gap-2 items-center">
                        <input
                          type="text" value={imgUrl}
                          onChange={(e) => {
                            const newGallery = [...(content.gallery || ["", "", ""])];
                            newGallery[idx] = e.target.value;
                            setContent({ ...content, gallery: newGallery });
                          }}
                          className="flex-1 border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 bg-card"
                          style={{ ["--tw-ring-color" as string]: MAROON } as React.CSSProperties}
                        />
                        <div className="relative">
                          <input 
                            type="file" 
                            accept=".png,.jpg,.jpeg" 
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            title="Upload an image"
                            onChange={async (e) => {
                              const files = e.target.files;
                              if (!files || files.length === 0) return;
                              const file = files[0];
                              const validTypes = ["image/png", "image/jpeg", "image/jpg"];
                              if (!validTypes.includes(file.type)) return;
                              
                              setUploadingGallery(idx);
                              try {
                                const base64String = await new Promise<string>((resolve, reject) => {
                                  const reader = new FileReader();
                                  reader.onloadend = () => resolve(reader.result as string);
                                  reader.onerror = reject;
                                  reader.readAsDataURL(file);
                                });
                                
                                const res = await fetch("/api/admin/upload", {
                                  method: "POST",
                                  headers: { "Content-Type": "application/json", "x-admin-token": getAdminToken() ?? "" },
                                  body: JSON.stringify({ name: file.name, data: base64String }),
                                });
                                const data = await res.json();
                                if (!res.ok) throw new Error(data.error);
                                
                                const newGallery = [...(content.gallery || ["", "", ""])];
                                newGallery[idx] = data.url;
                                setContent({ ...content, gallery: newGallery });
                              } catch (err: any) {
                                alert(err.message || "Failed to upload");
                              } finally {
                                setUploadingGallery(null);
                                e.target.value = '';
                              }
                            }}
                          />
                          <button type="button" className="px-4 py-2 bg-secondary border border-border rounded-lg text-sm font-medium hover:bg-secondary/80 flex items-center gap-2">
                            {uploadingGallery === idx ? <span className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" /> : <Upload size={16} />}
                            {uploadingGallery === idx ? "Uploading" : "Upload"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 pt-4 border-t border-border flex justify-end">
            <button
              onClick={handleSave} disabled={saving}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-semibold text-sm transition-all ${saving ? "opacity-70" : "hover:opacity-90"}`}
              style={{ background: MAROON }}
            >
              <Save size={16} /> {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      )}

      {activeSection === "blog" && !isEditingBlog && (
        <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden max-w-4xl">
          <div className="p-6 flex justify-between items-center border-b border-border">
            <h3 className="font-semibold text-foreground">Blog Posts</h3>
            <button
              onClick={() => {
                setEditingPost({ title: "", content: "", excerpt: "", category: "", imageUrl: "", readTime: "", isPublished: false });
                setIsEditingBlog(true);
              }}
              className="flex items-center gap-2 text-sm text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              style={{ background: MAROON }}
            >
              <Plus size={16} /> New Post
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-secondary/50 text-muted-foreground text-sm">
                  <th className="px-6 py-3 font-medium">Title</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm">
                {blogPosts.map((post) => (
                  <tr key={post._id} className="hover:bg-secondary/30">
                    <td className="px-6 py-4 font-medium text-foreground">{post.title}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${post.isPublished ? 'bg-success-bg text-success' : 'bg-muted text-muted-foreground'}`}>
                        {post.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 flex gap-3 justify-end">
                      <button onClick={() => { setEditingPost(post); setIsEditingBlog(true); }} className="text-muted-foreground hover:text-foreground">
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={async () => {
                          if (confirm("Are you sure you want to delete this post?")) {
                            await deleteBlogPost(post._id);
                            fetchBlogPosts();
                          }
                        }} 
                        className="text-muted-foreground hover:text-error"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {blogPosts.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                      No blog posts found. Create your first post!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeSection === "blog" && isEditingBlog && editingPost && (
        <div className="bg-card rounded-xl shadow-sm border border-border p-6 max-w-4xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-foreground text-lg">{editingPost._id ? "Edit Post" : "New Post"}</h3>
            <button onClick={() => setIsEditingBlog(false)} className="text-muted-foreground hover:text-foreground">
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Title</label>
              <input
                type="text" value={editingPost.title}
                onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                className="w-full border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 bg-card"
                style={{ ["--tw-ring-color" as string]: MAROON } as React.CSSProperties}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Excerpt</label>
              <textarea
                value={editingPost.excerpt}
                onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                className="w-full border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 bg-card h-20"
                style={{ ["--tw-ring-color" as string]: MAROON } as React.CSSProperties}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Content (Markdown / Text)</label>
              <textarea
                value={editingPost.content}
                onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                className="w-full border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 bg-card h-64 font-mono"
                style={{ ["--tw-ring-color" as string]: MAROON } as React.CSSProperties}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Category</label>
                <input
                  type="text" value={editingPost.category}
                  onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                  className="w-full border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 bg-card"
                  style={{ ["--tw-ring-color" as string]: MAROON } as React.CSSProperties}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Read Time</label>
                <input
                  type="text" value={editingPost.readTime}
                  onChange={(e) => setEditingPost({ ...editingPost, readTime: e.target.value })}
                  className="w-full border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 bg-card"
                  style={{ ["--tw-ring-color" as string]: MAROON } as React.CSSProperties}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-foreground mb-1">Image URL</label>
                <input
                  type="text" value={editingPost.imageUrl}
                  onChange={(e) => setEditingPost({ ...editingPost, imageUrl: e.target.value })}
                  className="w-full border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 bg-card"
                  style={{ ["--tw-ring-color" as string]: MAROON } as React.CSSProperties}
                />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer mt-4">
              <input 
                type="checkbox" 
                checked={editingPost.isPublished || false} 
                onChange={(e) => setEditingPost({ ...editingPost, isPublished: e.target.checked })} 
              />
              Published
            </label>
          </div>

          <div className="mt-8 pt-4 border-t border-border flex justify-end gap-3">
            <button
              onClick={() => setIsEditingBlog(false)}
              className="px-6 py-2.5 rounded-lg text-foreground font-medium text-sm transition-all hover:bg-secondary"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                try {
                  if (editingPost._id) {
                    await updateBlogPost(editingPost._id, editingPost);
                  } else {
                    await createBlogPost(editingPost);
                  }
                  fetchBlogPosts();
                  setIsEditingBlog(false);
                } catch (e) {
                  alert("Failed to save blog post");
                }
              }} 
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-semibold text-sm transition-all hover:opacity-90"
              style={{ background: MAROON }}
            >
              <Save size={16} /> Save Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
