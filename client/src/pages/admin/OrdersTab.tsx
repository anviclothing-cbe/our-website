import { useState, useEffect } from "react";
import { Eye, X } from "lucide-react";
import { getAdminOrders, updateOrderStatus } from "@/lib/adminApi";
import { Order } from "./types";
import { StatusBadge } from "./DashboardTab";
import { useCurrency } from "@/contexts/CurrencyContext";

const MAROON = "var(--brand-primary)";
// ─── Orders Tab ───────────────────────────────────────────────────────────────

function OrdersTab() {
  const { formatPrice } = useCurrency();
  const [data, setData] = useState<{ orders: Order[]; total: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Order | null>(null);

  const load = () => {
    setLoading(true);
    getAdminOrders().then(setData).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const handleStatus = async (id: string, status: string) => {
    await updateOrderStatus(id, status);
    load();
    setSelected(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6 font-serif" >
        Orders <span className="text-base font-normal text-muted-foreground">({data?.total ?? 0} total)</span>
      </h1>

      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="bg-secondary text-xs text-muted-foreground uppercase">
              <th className="px-4 py-3 text-left">Order #</th>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Total</th>
              <th className="px-4 py-3 text-left">Payment</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr></thead>
            <tbody>
              {loading ? [...Array(5)].map((_, i) => (
                <tr key={i} className="border-t"><td colSpan={7} className="px-4 py-3"><div className="h-8 bg-secondary animate-pulse rounded" /></td></tr>
              )) : data?.orders.map((o) => (
                <tr key={o._id} className="border-t border-border/50 hover:bg-secondary/50">
                  <td className="px-4 py-3 font-mono text-xs font-semibold" style={{ color: MAROON }}>{o.orderNumber}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-foreground">{o.customerName}</p>
                    <p className="text-xs text-muted-foreground">{o.customerEmail}</p>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(o.createdAt).toLocaleDateString("en-IN")}</td>
                  <td className="px-4 py-3 font-semibold">{formatPrice(o.total)}</td>
                  <td className="px-4 py-3 capitalize text-xs text-muted-foreground">{(o as any).paymentMethod ?? "—"}</td>
                  <td className="px-4 py-3"><StatusBadge status={o.status} /></td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => setSelected(o)} className="p-1.5 hover:bg-surface text-brand-primary rounded-lg"><Eye size={15} /></button>
                  </td>
                </tr>
              ))}
              {!loading && !data?.orders.length && (
                <tr><td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">No orders yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto py-8 px-4" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="bg-card rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="font-bold text-foreground font-serif text-xl">Order {selected.orderNumber}</h2>
              <button onClick={() => setSelected(null)} className="p-1.5 hover:bg-secondary rounded-lg"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-xs text-muted-foreground">Customer</p><p className="font-medium">{selected.customerName}</p></div>
                <div><p className="text-xs text-muted-foreground">Phone</p><p className="font-medium">{selected.customerPhone}</p></div>
                <div className="col-span-2"><p className="text-xs text-muted-foreground">Email</p><p className="font-medium">{selected.customerEmail}</p></div>
                <div className="col-span-2"><p className="text-xs text-muted-foreground">Address</p>
                  <p className="font-medium">{(selected as any).address?.line1}, {(selected as any).address?.city} - {(selected as any).address?.pincode}</p>
                </div>
              </div>
              <div className="border-t border-border pt-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Items</p>
                {selected.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm py-1.5 border-b border-border/50">
                    <span>{item.name} <span className="text-muted-foreground">× {item.quantity} ({item.size})</span></span>
                    <span className="font-semibold">{formatPrice((item.price * item.quantity))}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold text-base mt-2">
                  <span>Total</span><span style={{ color: MAROON }}>{formatPrice(selected.total)}</span>
                </div>
              </div>
              <div className="border-t border-border pt-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Update Status</p>
                <div className="flex flex-wrap gap-2">
                  {["pending", "confirmed", "shipped", "delivered", "cancelled"].map((s) => (
                    <button key={s} onClick={() => handleStatus(selected._id, s)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all border ${selected.status === s ? "border-yellow-400 text-white" : "border-border text-muted-foreground hover:border-yellow-300"}`}
                      style={selected.status === s ? { background: MAROON } : {}}>
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
export default OrdersTab;
