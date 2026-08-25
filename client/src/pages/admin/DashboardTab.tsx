import { useState, useEffect } from "react";
import { Eye, X, TrendingUp } from "lucide-react";
import { getDashboard, updateOrderStatus } from "@/lib/adminApi";
import { Order } from "./types";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useCurrency } from "@/contexts/CurrencyContext";

const MAROON = "var(--brand-primary)";

export function StatusBadge({ status }: { status: string }) {
  const { formatPrice } = useCurrency();
  let bg = "bg-surface", text = "text-text-muted";
  if (status === "pending") { bg = "bg-warning-bg"; text = "text-warning"; }
  if (status === "confirmed") { bg = "bg-info-bg"; text = "text-info"; }
  if (status === "shipped") { bg = "bg-surface-dark"; text = "text-text-on-dark"; }
  if (status === "delivered") { bg = "bg-success-bg"; text = "text-success"; }
  if (status === "cancelled") { bg = "bg-error-bg"; text = "text-error"; }
  
  return <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${bg} ${text}`}>{status}</span>;
}

export default function DashboardTab() {
  const { formatPrice } = useCurrency();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Order | null>(null);

  useEffect(() => {
    getDashboard().then(setStats).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleStatus = async (id: string, s: string) => {
    try {
      await updateOrderStatus(id, s);
      if (selected) setSelected({ ...selected, status: s });
      getDashboard().then(setStats);
    } catch (e) {
      alert("Failed to update status");
    }
  };

  const cards = stats ? [
    { label: "Total Revenue", value: `₹${(stats.totalRevenue ?? 0).toLocaleString("en-IN")}`, color: MAROON },
    { label: "Total Orders", value: stats.totalOrders, color: "var(--brand-primary)" },
    { label: "Avg. Order Value", value: `₹${(stats.averageOrderValue ?? 0).toLocaleString("en-IN")}`, color: "var(--text-primary)" },
    { label: "Total Customers", value: stats.totalCustomers ?? 0, color: "var(--text-primary)" },
    { label: "Total Leads", value: stats.totalLeads ?? 0, color: "var(--text-primary)" },
    { label: "Pending Orders", value: stats.pendingOrders, color: "var(--error)" },
    { label: "Total Products", value: stats.totalProducts, color: "var(--text-muted)" },
    { label: "Total Categories", value: stats.totalCategories, color: "var(--text-muted)" },
  ] : [];

  return (
    <div>
      <h1 className="text-3xl font-light text-text-primary mb-8 font-serif">Dashboard Overview</h1>
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(7)].map((_, i) => <div key={i} className="h-32 rounded-xl bg-surface-dark/50 animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          {cards.map((c) => (
            <div key={c.label} className="rounded-xl p-6 bg-surface shadow-sm border border-border-subtle flex flex-col justify-center transition-all hover:shadow-md">
              <p className="text-3xl font-serif mb-2" style={{ color: c.color }}>{c.value}</p>
              <p className="text-xs uppercase tracking-widest text-text-muted font-medium flex items-center gap-2">
                {c.label} {c.label === "Total Revenue" && <TrendingUp className="w-3 h-3 text-success" />}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Analytics Chart */}
      {stats?.salesData && stats.salesData.length > 0 && (
        <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden mb-10 p-6">
          <div className="font-semibold text-foreground text-base mb-6 font-serif flex items-center gap-2">
            Revenue Overview
          </div>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.salesData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis 
                  stroke="var(--text-muted)" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--surface)', borderRadius: '8px', border: '1px solid var(--border-subtle)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ color: 'var(--brand-primary)', fontWeight: 'bold' }}
                  formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Revenue']}
                />
                <Line type="monotone" dataKey="revenue" stroke={MAROON} strokeWidth={3} dot={{ r: 4, fill: MAROON, strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Recent Orders */}
      {stats?.recentOrders?.length > 0 && (
        <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden mb-10">
          <div className="px-6 py-4 border-b border-border font-semibold text-foreground text-sm">Recent Orders</div>
          <table className="w-full text-sm">
            <thead><tr className="bg-secondary text-xs text-muted-foreground uppercase">
              <th className="px-6 py-3 text-left">Order #</th>
              <th className="px-6 py-3 text-left">Customer</th>
              <th className="px-6 py-3 text-left">Total</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr></thead>
            <tbody>
              {stats.recentOrders.map((o: Order) => (
                <tr key={o._id} className="border-t border-border hover:bg-secondary/50">
                  <td className="px-6 py-3 font-mono text-xs text-muted-foreground">{o.orderNumber}</td>
                  <td className="px-6 py-3 font-medium text-foreground">{o.customerName}</td>
                  <td className="px-6 py-3 font-semibold">{formatPrice(o.total)}</td>
                  <td className="px-6 py-3"><StatusBadge status={o.status} /></td>
                  <td className="px-6 py-3 text-center">
                    <button onClick={() => setSelected(o)} className="p-1.5 hover:bg-surface text-brand-primary rounded-lg"><Eye size={15} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Order detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto py-8 px-4" style={{ background: "rgba(0,0,0,0.6)" }}>
          <div className="bg-card rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="font-bold text-foreground font-serif text-xl">Order {selected.orderNumber}</h2>
              <button onClick={() => setSelected(null)} className="p-1.5 hover:bg-secondary rounded-lg"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Customer</p><p className="font-medium text-foreground">{selected.customerName}</p></div>
                <div><p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Phone</p><p className="font-medium text-foreground">{selected.customerPhone}</p></div>
                <div className="col-span-2"><p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Email</p><p className="font-medium text-foreground">{selected.customerEmail}</p></div>
                <div className="col-span-2"><p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Address</p>
                  <p className="font-medium text-foreground">{(selected as any).address?.line1}, {(selected as any).address?.city} - {(selected as any).address?.pincode}</p>
                </div>
              </div>
              <div className="border-t border-border pt-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Items</p>
                {selected.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm py-1.5 border-b border-border/50">
                    <span className="text-foreground">{item.name} <span className="text-muted-foreground">× {item.quantity} ({item.size})</span></span>
                    <span className="font-semibold text-foreground">{formatPrice((item.price * item.quantity))}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold text-base mt-3">
                  <span className="text-foreground">Total</span><span style={{ color: MAROON }}>{formatPrice(selected.total)}</span>
                </div>
              </div>
              <div className="border-t border-border pt-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Update Status</p>
                <div className="flex flex-wrap gap-2">
                  {["pending", "confirmed", "shipped", "delivered", "cancelled"].map((s) => (
                    <button key={s} onClick={() => handleStatus(selected._id, s)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all border ${selected.status === s ? "border-maroon text-white" : "border-border text-foreground hover:bg-secondary"}`}
                      style={selected.status === s ? { background: MAROON, borderColor: MAROON } : {}}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
