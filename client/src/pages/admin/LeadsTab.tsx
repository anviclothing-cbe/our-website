import { useState, useEffect } from "react";
import { getLeads } from "@/lib/adminApi";

export default function LeadsTab() {
  const [leads, setLeads] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async (p: number) => {
    setLoading(true);
    try {
      const data = await getLeads(p);
      setLeads(data.leads || []);
      setTotal(data.total || 0);
      setPages(data.pages || 1);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads(page);
  }, [page]);

  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-light text-text-primary font-serif mb-2">Lead Management</h1>
          <p className="text-text-muted">View and manage captured leads from popups and newsletters.</p>
        </div>
        <div className="text-sm font-medium text-text-muted">Total: {total} Leads</div>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-secondary text-xs text-muted-foreground uppercase tracking-wider">
              <th className="px-6 py-4 font-semibold">Name</th>
              <th className="px-6 py-4 font-semibold">Email</th>
              <th className="px-6 py-4 font-semibold">Phone</th>
              <th className="px-6 py-4 font-semibold">Source</th>
              <th className="px-6 py-4 font-semibold">Captured Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="border-t border-border">
                  <td colSpan={5} className="px-6 py-4"><div className="h-4 bg-secondary animate-pulse rounded w-full" /></td>
                </tr>
              ))
            ) : leads.length === 0 ? (
              <tr className="border-t border-border">
                <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">No leads captured yet.</td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead._id} className="border-t border-border hover:bg-secondary/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{lead.name}</td>
                  <td className="px-6 py-4">
                    <a href={`mailto:${lead.email}`} className="text-brand-primary hover:underline">{lead.email}</a>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs">{lead.phone}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-surface-dark text-text-on-dark rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {lead.source}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground text-xs">
                    {new Date(lead.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        
        {pages > 1 && (
          <div className="px-6 py-4 border-t border-border flex justify-between items-center bg-surface/50">
            <span className="text-sm text-muted-foreground">
              Page {page} of {pages}
            </span>
            <div className="flex gap-2">
              <button 
                disabled={page === 1} 
                onClick={() => setPage(p => p - 1)}
                className="px-3 py-1.5 border border-border rounded text-sm disabled:opacity-50 hover:bg-secondary transition-colors"
              >
                Previous
              </button>
              <button 
                disabled={page === pages} 
                onClick={() => setPage(p => p + 1)}
                className="px-3 py-1.5 border border-border rounded text-sm disabled:opacity-50 hover:bg-secondary transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
