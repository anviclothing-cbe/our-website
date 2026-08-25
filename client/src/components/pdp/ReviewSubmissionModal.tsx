import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "../shared/StarRating";
import { useToast } from "@/hooks/use-toast";
import { Camera, X } from "lucide-react";

interface ReviewSubmissionModalProps {
  productId: string;
  productName: string;
  children: React.ReactNode;
}

export function ReviewSubmissionModal({ productId, productName, children }: ReviewSubmissionModalProps) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mockImages, setMockImages] = useState<string[]>([]);
  
  const [errors, setErrors] = useState<{ rating?: string; body?: string }>({});
  const { toast } = useToast();

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      // Reset form on close
      setRating(0);
      setTitle("");
      setBody("");
      setMockImages([]);
      setErrors({});
    }
  };

  const handleMockImageUpload = () => {
    if (mockImages.length >= 3) {
      toast({
        title: "Maximum photos reached",
        description: "You can upload a maximum of 3 photos.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate selecting an image and adding to array
    setMockImages([...mockImages, `https://images.unsplash.com/photo-1589465885857-44edb59bbff2?q=80&w=800&auto=format&fit=crop/FAF7F2/2F2B2B?text=Photo+${mockImages.length + 1}`]);
  };

  const removeImage = (index: number) => {
    setMockImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { rating?: string; body?: string } = {};
    if (rating === 0) newErrors.rating = "Please choose a rating.";
    if (body.trim().length < 10) newErrors.body = "Please write at least 10 characters.";
    if (body.trim().length > 1000) newErrors.body = "Please keep your review under 1,000 characters.";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setOpen(false);
      toast({
        title: "Thank you for sharing your ANVI experience.",
        description: "Your review has been submitted for moderation and will appear soon.",
      });
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-surface border-border-subtle">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-text-primary">Write a Review</DialogTitle>
          <DialogDescription className="text-text-muted">
            Share your thoughts on the {productName}.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="mt-4 space-y-6">
          <div className="space-y-3">
            <Label className="text-text-primary text-base">Overall Rating <span className="text-error">*</span></Label>
            <StarRating 
              rating={rating} 
              interactive 
              onRatingChange={(r) => {
                setRating(r);
                if (errors.rating) setErrors({ ...errors, rating: undefined });
              }} 
              size="lg"
            />
            {errors.rating && <p className="text-sm text-error mt-1">{errors.rating}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="review-title" className="text-text-primary">Review Title (Optional)</Label>
            <Input 
              id="review-title" 
              placeholder="Summary of your experience" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-surface border-border-subtle focus-visible:ring-border-strong"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="review-body" className="text-text-primary">Your Review <span className="text-error">*</span></Label>
            <Textarea 
              id="review-body" 
              placeholder="How is the fit? What do you think of the fabric?" 
              rows={4}
              value={body}
              onChange={(e) => {
                setBody(e.target.value);
                if (errors.body) setErrors({ ...errors, body: undefined });
              }}
              className="bg-surface border-border-subtle focus-visible:ring-border-strong resize-none"
            />
            {errors.body && <p className="text-sm text-error mt-1">{errors.body}</p>}
            <p className="text-xs text-text-muted text-right">{body.length}/1000</p>
          </div>

          <div className="space-y-3">
            <Label className="text-text-primary block">Add Photos (Optional)</Label>
            <div className="flex flex-wrap gap-3">
              {mockImages.map((img, idx) => (
                <div key={idx} className="relative w-20 h-24 rounded-md overflow-hidden border border-border-subtle">
                  <img src={img} alt={`Upload preview ${idx}`} className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-black/70"
                    aria-label="Remove image"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              {mockImages.length < 3 && (
                <button
                  type="button"
                  onClick={handleMockImageUpload}
                  className="w-20 h-24 rounded-md border border-dashed border-border-subtle flex flex-col items-center justify-center gap-1 text-text-muted hover:text-text-primary hover:border-border-strong hover:bg-surface-light transition-colors"
                >
                  <Camera className="w-5 h-5" />
                  <span className="text-[10px] uppercase font-medium tracking-wider">Add Photo</span>
                </button>
              )}
            </div>
          </div>

          <div className="pt-2">
            <Button 
              type="submit" 
              className="w-full h-12 text-base font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? "SUBMITTING..." : "SUBMIT REVIEW"}
            </Button>
            <p className="text-xs text-text-muted text-center mt-3">
              By submitting, you agree to our Terms of Use regarding customer-generated content.
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
