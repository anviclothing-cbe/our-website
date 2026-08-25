import { useEffect } from "react"
import { Instagram } from "lucide-react"

export function SocialShowcase() {
  useEffect(() => {
    // Load Elfsight platform script if not already loaded
    if (!document.querySelector('script[src="https://static.elfsight.com/platform/platform.js"]')) {
      const script = document.createElement("script");
      script.src = "https://static.elfsight.com/platform/platform.js";
      script.dataset.useServiceCore = "defer";
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 overflow-hidden">
      <div className="flex flex-col items-center mb-10 text-center">
        <h2 className="font-serif text-3xl md:text-5xl text-text-primary mb-4">Make a statement.</h2>
        <a 
          href="https://instagram.com/anviclothing" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-text-muted hover:text-text-primary text-sm md:text-lg flex items-center gap-2 transition-colors"
        >
          Tag @anviclothing to be featured in our story.
        </a>
      </div>

      <div className="w-full min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-border-subtle rounded-3xl bg-surface p-8 relative">
        {/* === INSTRUCTIONS FOR ADMIN/DEVELOPER === */}
        {/* The widget will render below. If the widget is missing, this helper text shows up. */}
        <div className="text-center max-w-lg z-0 absolute">
          <Instagram className="w-12 h-12 text-text-muted mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-medium text-text-primary mb-2">Connect Your Instagram</h3>
          <p className="text-text-muted text-sm mb-6">
            To display your Instagram reels and posts here automatically:
          </p>
          <ol className="text-sm text-text-muted text-left list-decimal pl-5 space-y-2 mb-6">
            <li>Go to <a href="https://elfsight.com/instagram-feed-instashow/" target="_blank" rel="noreferrer" className="text-button-primary hover:underline">Elfsight Instagram Feed</a> and create a free widget.</li>
            <li>Connect your Instagram account to the widget.</li>
            <li>Copy your unique Widget ID from the installation code.</li>
            <li>In <code className="bg-surface-accent px-1 py-0.5 rounded text-xs text-text-primary">client/src/components/home/SocialShowcase.tsx</code>, replace <code className="bg-surface-accent px-1 py-0.5 rounded text-xs text-text-primary">PLACEHOLDER_ID</code> below with your actual ID.</li>
          </ol>
        </div>
        
        {/* === REPLACE THIS WITH YOUR ELFSIGHT ID === */}
        <div className="elfsight-app-PLACEHOLDER_ID w-full z-10 bg-surface"></div>
        {/* E.g., <div className="elfsight-app-12345678-1234-1234-1234-1234567890ab w-full z-10"></div> */}
      </div>
    </section>
  )
}
