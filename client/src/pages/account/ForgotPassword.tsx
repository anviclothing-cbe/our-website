import { useState } from "react"
import { Link } from "wouter"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

import { useSEO } from "@/hooks/useSEO";

import { forgotPasswordApi } from "@/lib/api"

export default function ForgotPassword() {
  useSEO({ title: "Forgot Password | ANVI Clothing", noindex: true });
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      await forgotPasswordApi(email)
      setIsSuccess(true)
      toast({ title: "Reset link sent", description: "Please check your email for instructions." })
    } catch (error: any) {
      toast({ title: "Request failed", description: error.message || "An error occurred", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="w-full max-w-md mx-auto px-4 py-24 mt-16 flex flex-col items-center text-center">
        <h1 className="text-3xl font-serif text-text-primary mb-4">Check your email</h1>
        <p className="text-text-muted mb-8">
          If an account exists for <strong>{email}</strong>, you will receive a password reset link shortly.
        </p>
        <Link href="/account/login">
          <a className="inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-button-primary text-text-on-dark hover:bg-border-subtle h-10 px-4 py-2 w-full">
            RETURN TO SIGN IN
          </a>
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto px-4 py-24 mt-16 flex flex-col items-center">
      <h1 className="text-3xl font-serif text-text-primary mb-2">Reset Password</h1>
      <p className="text-text-muted mb-8 text-center">
        Enter your email address to receive a password reset link.
      </p>

      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input 
            id="email" 
            type="email" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "SENDING..." : "SEND RESET LINK"}
        </Button>
      </form>

      <div className="mt-8 pt-8 border-t border-border-subtle w-full text-center">
        <Link href="/account/login">
          <a className="text-sm text-text-muted hover:text-text-primary underline underline-offset-4">
            Cancel and return to Sign In
          </a>
        </Link>
      </div>
    </div>
  )
}
