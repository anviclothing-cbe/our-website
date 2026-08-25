import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { useLocation, Link } from "wouter"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

import { useSEO } from "@/hooks/useSEO";

export default function Login() {
  useSEO({ title: "Login | ANVI Clothing", noindex: true });
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const { login, isLoading } = useAuth()
  const [, setLocation] = useLocation()

  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(email, password)
      setLocation("/account")
    } catch (error: any) {
      toast({ title: "Login failed", description: error.message || "Invalid credentials", variant: "destructive" })
    }
  }

  return (
    <div className="w-full max-w-md mx-auto px-4 py-24 mt-16 flex flex-col items-center">
      <h1 className="text-3xl font-serif text-text-primary mb-2">Welcome back</h1>
      <p className="text-text-muted mb-8 text-center">
        Good to see you again. Sign in to continue.
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

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="/account/forgot-password">
              <a className="text-sm text-text-muted hover:text-text-primary underline underline-offset-4">
                Forgot password?
              </a>
            </Link>
          </div>
          <div className="relative">
            <Input 
              id="password" 
              type={showPassword ? "text" : "password"} 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "SIGNING IN..." : "SIGN IN"}
        </Button>
      </form>

      <div className="mt-8 pt-8 border-t border-border-subtle w-full text-center">
        <p className="text-text-muted mb-4">Don't have an account?</p>
        <Link href="/account/register">
          <a className="inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-border-strong bg-transparent hover:bg-button-primary hover:text-text-on-dark h-10 px-4 py-2 w-full">
            Create one
          </a>
        </Link>
      </div>
    </div>
  )
}
