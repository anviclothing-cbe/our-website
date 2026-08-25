import { LayoutDashboard, Package, Tag, ShoppingBag, LogOut, FileText, Users } from "lucide-react";

const MAROON = "var(--brand-primary)";
const DARK = "var(--text-primary)";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "products", label: "Products", icon: Package },
  { id: "categories", label: "Categories", icon: Tag },
  { id: "orders", label: "Orders", icon: ShoppingBag },
  { id: "leads", label: "Leads", icon: Users },
  { id: "cms", label: "Content (CMS)", icon: FileText },
];

export default function AdminLayout({ active, setActive, onLogout, children }: { active: string; setActive: (s: string) => void; onLogout: () => void; children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-surface text-text-primary" style={{ fontFamily: "var(--font-sans)" }}>
      {/* Sidebar */}
      <aside className="w-64 min-h-screen flex flex-col shrink-0" style={{ background: DARK, boxShadow: "4px 0 20px rgba(0,0,0,0.25)" }}>
        {/* Logo */}
        <div className="p-6 border-b text-center" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <img
            src="/anvi_main_logo.png"
            alt="Anvi Clothing"
            className="h-20 w-auto mx-auto object-contain transition-all duration-300 ease-in-out hover:scale-105 filter hover:drop-shadow-[0_2px_8px_rgba(255,255,255,0.1)]"
          />
          <p className="text-xs mt-3 font-semibold tracking-widest uppercase text-brand-gold">Admin Panel</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id} onClick={() => setActive(id)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200"
              style={active === id
                ? { background: MAROON, color: "var(--text-on-dark)", borderLeft: `4px solid var(--brand-gold)` }
                : { color: "rgba(255,255,255,0.6)", borderLeft: "4px solid transparent" }}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t" style={{ borderColor: "rgba(124,36,58,0.2)" }}>
          <a href="/" className="flex items-center gap-2 text-xs text-white/50 hover:text-white/90 mb-3 transition-colors">
            ← Back to Store
          </a>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm transition-colors text-error hover:bg-error/10"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 max-h-screen overflow-y-auto">
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
