import { Loader2 } from "lucide-react";

export function PageSkeleton() {
  return (
    <div className="min-h-[60vh] w-full flex flex-col items-center justify-center space-y-4 text-text-muted">
      <Loader2 className="w-8 h-8 animate-spin" />
      <p className="text-sm font-medium tracking-wide uppercase">Just a moment...</p>
    </div>
  );
}
