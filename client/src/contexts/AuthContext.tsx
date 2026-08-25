import React, { createContext, useContext, useState, useEffect } from "react"
import { User, MOCK_USER } from "@/lib/mock-data"
import { useToast } from "@/hooks/use-toast"
import { loginApi, registerApi, updateProfileApi, fetchSessionApi, logoutApi } from "@/lib/api"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password?: string) => Promise<void>
  logout: () => void
  register: (name: string, email: string, password?: string, phone?: string) => Promise<void>
  updateProfile: (updates: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Verify session on mount
  useEffect(() => {
    async function initAuth() {
      try {
        // Attempt to fetch real session if connected
        const session = await fetchSessionApi()
        setUser(session.user)
      } catch (err) {
        // Fallback for frontend-only development
        const storedUser = localStorage.getItem("anvi_user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } finally {
        setIsLoading(false)
      }
    }
    initAuth()
  }, [])

  const login = async (email: string, password?: string) => {
    setIsLoading(true)
    try {
      const response = await loginApi(email, password)
      setUser(response.user)
      toast({ title: "Welcome back!", description: "You have successfully signed in." })
    } catch (err: any) {
      // Re-throw the error to be handled by the component
      throw err;
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await logoutApi()
    } catch (err) {
      // Ignore API errors during dev
    } finally {
      setUser(null)
      localStorage.removeItem("anvi_user")
      toast({ title: "Signed out", description: "You have been successfully signed out." })
    }
  }

  const register = async (name: string, email: string, password?: string, phone?: string) => {
    setIsLoading(true)
    try {
      const response = await registerApi(name, email, password, phone)
      setUser(response.user)
      toast({ title: "Account created", description: "Welcome to ANVI!" })
    } catch (err: any) {
      // Re-throw the error to be handled by the component
      throw err;
    } finally {
      setIsLoading(false)
    }
  }

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return
    setIsLoading(true)
    try {
      const response = await updateProfileApi(updates)
      setUser(response.user)
      toast({ title: "Your details have been updated." })
    } catch (err) {
      // Fallback
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem("anvi_user", JSON.stringify(updatedUser))
      toast({ title: "Your details have been updated.", description: "(Offline Mode)" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
