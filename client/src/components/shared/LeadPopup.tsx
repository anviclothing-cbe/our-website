import { useState, useEffect } from "react"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogClose
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"
import { useLocation } from "wouter"
import { fetchStoreContent } from "@/lib/api"

export function LeadPopup() {
  const [open, setOpen] = useState(false)
  const [hasSeenPopup, setHasSeenPopup] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [popupContent, setPopupContent] = useState<any>(null)

  const [location] = useLocation()

  useEffect(() => {
    fetchStoreContent("popup")
      .then(data => setPopupContent(data?.content || data))
      .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    // FORCE CLEAR LOCAL STORAGE FOR TESTING
    localStorage.removeItem("anvi_lead_captured");
    
    // Only show if they haven't submitted their details yet
    const hasSubmitted = localStorage.getItem("anvi_lead_captured")
    
    // Default to active if popupContent is null (hasn't been set up in CMS yet)
    const isPopupActive = popupContent ? popupContent.isActive : true;
    

    
    // Only show if the popup is marked as active in CMS
    if (!hasSubmitted && isPopupActive) {

      // Show popup after 3 seconds on each new page visit
      const timer = setTimeout(() => {

        setOpen(true)
      }, 3000)
      return () => {

        clearTimeout(timer);
      }
    }

    return () => {}; // return empty cleanup function if conditions are not met
  }, [location, popupContent]) // Dependency on location and popupContent

  useEffect(() => {

  }, [open])

  const handleClose = () => {
    setOpen(false)
    setTimeout(() => setIsSubmitted(false), 300)
    
  }

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch("/api/store/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, source: "Popup" })
      });
      
      if (response.ok) {
        setIsSubmitted(true)
        localStorage.setItem("anvi_lead_captured", "true")
      }
    } catch (err) {
      console.error("Failed to capture lead", err);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen)
      if (!isOpen) {
        
      }
    }}>
      <DialogContent className="sm:max-w-md bg-surface-light border-border-subtle p-0 overflow-hidden shadow-2xl">
        <button 
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-10"
        >
          <X className="h-5 w-5 text-text-primary" />
          <span className="sr-only">Close</span>
        </button>
        
        <div className="flex flex-col md:flex-row">
          {/* Left side image - hidden on small mobile, visible on sm and up */}
          <div className="hidden sm:block sm:w-2/5 bg-brand-primary-dark">
            <img 
              src={popupContent?.image || "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop"} 
              alt="ANVI Fashion" 
              className="w-full h-full object-cover opacity-90"
            />
          </div>
          
          <div className="p-8 sm:w-3/5 flex flex-col justify-center">
            <DialogHeader className="mb-6 text-left">
              <DialogTitle className="font-serif text-3xl md:text-4xl text-text-primary mb-2">
                {!isSubmitted ? (popupContent?.title || "Get 5% off now") : "Success!"}
              </DialogTitle>
              <DialogDescription className="text-text-muted text-base">
                {!isSubmitted 
                  ? (popupContent?.subtitle || "Join us today and get your exclusive coupon.") 
                  : "Here is your exclusive 5% off coupon code."}
              </DialogDescription>
            </DialogHeader>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input 
                    type="text" 
                    placeholder="Your name" 
                    className="bg-transparent border-border-default focus-visible:ring-brand-primary h-12"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="flex gap-2">
                  <div className="flex items-center justify-center border border-border-default rounded-md px-3 bg-surface text-text-primary h-12 w-24">
                    <span className="mr-2 text-lg">🇮🇳</span>
                    <span>+91</span>
                  </div>
                  <Input 
                    type="tel" 
                    placeholder="Phone number" 
                    className="bg-transparent border-border-default focus-visible:ring-brand-primary flex-1 h-12"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Input 
                    type="email" 
                    placeholder="Your email address" 
                    className="bg-transparent border-border-default focus-visible:ring-brand-primary h-12"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 mt-2 text-base font-medium tracking-wide"
                >
                  Get Coupon Code
                </Button>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-6 py-2 animate-fade-in text-center">
                <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <div 
                  className="bg-surface border-2 border-dashed border-brand-gold w-full py-4 px-2 rounded-md flex flex-col items-center justify-center cursor-copy hover:bg-brand-gold/10 transition-colors" 
                  onClick={() => {
                    navigator.clipboard.writeText("ANVIWELCOME5");
                    alert("Coupon code copied to clipboard!");
                  }}
                  title="Click to copy"
                >
                  <span className="font-mono text-xl sm:text-2xl font-bold tracking-wider text-brand-primary-dark mb-1">ANVIWELCOME5</span>
                  <span className="text-xs text-text-muted uppercase tracking-widest flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Tap to Copy
                  </span>
                </div>
                
                <Button 
                  variant="outline"
                  onClick={handleClose} 
                  className="w-full h-12"
                >
                  Continue Shopping
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
