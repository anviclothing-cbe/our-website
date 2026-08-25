import { useState } from "react";
import { Sparkles, Flower2, AlertCircle, Eye, EyeOff } from "lucide-react";
import { adminLogin, setAdminToken } from "@/lib/adminApi";

const MAROON = "var(--brand-primary)";
const DARK = "var(--color-anvi-charcoal)";

export default function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { token } = await adminLogin(email, password);
      setAdminToken(token);
      onLogin();
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(135deg, var(--color-anvi-ivory) 0%, var(--color-anvi-beige) 100%)" }}>
      <div className="w-full max-w-md px-4">
        <div className="bg-background rounded-2xl shadow-2xl overflow-hidden" style={{ boxShadow: `0 20px 60px rgba(124,36,58,0.18)` }}>
          {/* Header */}
          <div className="p-8 text-center" style={{ background: `linear-gradient(135deg, ${DARK}, var(--color-anvi-charcoal-light, #333))` }}>
            <img
              src="/anvi_logo.png"
              alt="Anvi Clothing"
              className="h-28 mx-auto mb-4 object-contain transition-all duration-300 ease-in-out hover:scale-105 filter hover:drop-shadow-[0_4px_12px_rgba(124,36,58,0.25)]"
            />
            <p className="text-sm font-semibold tracking-widest uppercase flex items-center justify-center gap-1.5" style={{ color: MAROON }}>
              <Sparkles size={13} /> Admin Panel <Sparkles size={13} />
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            <p className="font-semibold text-text-primary mb-4 text-lg flex items-center gap-2 justify-center" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              <Flower2 size={18} style={{ color: MAROON }} /> Admin Sign In
            </p>

            {error && (
              <div className="mb-4 p-3 rounded-lg flex items-center gap-2 text-sm text-error bg-error-bg border border-error">
                <AlertCircle size={16} /> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">Email Address</label>
                <input
                  type="email" required value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@anviclothing.com"
                  className="w-full border border-border-default rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all"
                  style={{ ["--tw-ring-color" as string]: MAROON } as React.CSSProperties}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPw ? "text" : "password"} required value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full border border-border-default rounded-lg px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 transition-all"
                    style={{ ["--tw-ring-color" as string]: MAROON } as React.CSSProperties}
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-muted">
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <button
                type="submit" disabled={loading}
                className={`w-full py-3 rounded-lg text-white font-semibold text-sm transition-all ${loading ? "opacity-70" : "hover:opacity-90"}`}
                style={{ background: `linear-gradient(135deg, ${MAROON}, var(--color-anvi-maroon-deep, #5c1828))`, boxShadow: `0 4px 20px rgba(124,36,58,0.35)` }}
              >
                {loading ? "Signing in..." : "Sign In to Admin"}
              </button>
            </form>

            <p className="text-center text-xs text-text-muted mt-6">
              <a href="/" className="hover:underline">← Back to website</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
