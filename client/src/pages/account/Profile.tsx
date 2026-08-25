import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

import { useSEO } from "@/hooks/useSEO";

export default function Profile() {
  useSEO({ title: "My Profile | ANVI Clothing", noindex: true });
  const { user, updateProfile } = useAuth()
  
  if (!user) return null

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [phone, setPhone] = useState(user.phone || "")
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    await updateProfile({ name, email, phone })
    setIsSaving(false)
    setIsEditing(false)
  }

  return (
    <div className="w-full space-y-8 max-w-2xl">
      <header className="border-b border-border-subtle pb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-serif text-text-primary">Profile Details</h2>
          <p className="text-text-muted mt-2">
            Manage your personal information and addresses.
          </p>
        </div>
        {!isEditing && (
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            EDIT
          </Button>
        )}
      </header>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              type="text" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number (Optional)</Label>
            <Input 
              id="phone" 
              type="tel" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-border-subtle">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "SAVING..." : "SAVE CHANGES"}
            </Button>
            <Button type="button" variant="ghost" onClick={() => setIsEditing(false)} disabled={isSaving}>
              CANCEL
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-4 border-b border-border-subtle pb-4">
            <span className="text-sm font-medium text-text-primary uppercase tracking-wider">Name</span>
            <span className="col-span-2 text-text-muted">{user.name}</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-4 border-b border-border-subtle pb-4">
            <span className="text-sm font-medium text-text-primary uppercase tracking-wider">Email</span>
            <span className="col-span-2 text-text-muted">{user.email}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-4 border-b border-border-subtle pb-4">
            <span className="text-sm font-medium text-text-primary uppercase tracking-wider">Phone</span>
            <span className="col-span-2 text-text-muted">{user.phone || "Not provided"}</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-4 pb-4">
            <span className="text-sm font-medium text-text-primary uppercase tracking-wider">Password</span>
            <div className="col-span-2 flex flex-col items-start gap-2">
              <span className="text-text-muted">••••••••</span>
              <button className="text-sm font-medium text-text-primary underline underline-offset-4">Change password</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-4 pt-8 mt-8 border-t border-border-subtle">
            <span className="text-sm font-medium text-brand-maroon uppercase tracking-wider">Data Privacy</span>
            <div className="col-span-2 flex flex-col items-start gap-2">
              <p className="text-sm text-text-muted mb-2">Once you delete your account, all your personal data and order history will be permanently removed.</p>
              <button 
                onClick={() => toast({ title: "Request Received", description: "Your account deletion request has been submitted and is pending review." })}
                className="text-sm font-medium text-brand-maroon hover:text-brand-maroon/80 underline underline-offset-4"
              >
                Request Account Deletion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
