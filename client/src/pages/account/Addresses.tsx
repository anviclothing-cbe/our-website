import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"

import { useSEO } from "@/hooks/useSEO";

export default function Addresses() {
  useSEO({ title: "My Addresses | ANVI Clothing", noindex: true });
  const { user } = useAuth()
  
  if (!user) return null

  const addresses = user.addresses || []

  return (
    <div className="w-full space-y-8">
      <header className="border-b border-border-subtle pb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-serif text-text-primary">Saved Addresses</h2>
          <p className="text-text-muted mt-2">
            Manage your shipping and billing addresses.
          </p>
        </div>
        <Button className="hidden md:flex">ADD AN ADDRESS</Button>
      </header>

      {addresses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <div key={address.id} className="border border-border-subtle p-6 flex flex-col h-full relative group">
              {address.isDefault && (
                <span className="absolute top-6 right-6 text-[10px] font-bold tracking-wider text-text-primary bg-border-subtle px-2 py-1 rounded-sm">
                  DEFAULT
                </span>
              )}
              
              <h3 className="font-serif text-lg text-text-primary mb-4">{address.label}</h3>
              
              <address className="text-sm text-text-muted not-italic space-y-1 flex-1">
                <p className="font-medium text-text-primary">{address.name}</p>
                <p>{address.addressLine1}</p>
                {address.addressLine2 && <p>{address.addressLine2}</p>}
                <p>{address.city}, {address.state} {address.pincode}</p>
                <p>{address.country}</p>
                <p className="pt-2">Phone: {address.phone}</p>
              </address>

              <div className="flex items-center gap-4 mt-6 pt-4 border-t border-border-subtle opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                <button className="text-sm font-medium text-text-primary hover:underline underline-offset-4">Edit</button>
                <button className="text-sm font-medium text-error hover:underline underline-offset-4">Delete</button>
                {!address.isDefault && (
                  <button className="text-sm font-medium text-text-primary hover:underline underline-offset-4 ml-auto">
                    Set as Default
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-border-subtle p-8 text-center max-w-lg mx-auto mt-12">
          <p className="text-text-muted mb-4">No saved addresses yet.</p>
          <Button>ADD AN ADDRESS</Button>
        </div>
      )}

      <Button className="w-full md:hidden mt-6">ADD AN ADDRESS</Button>
    </div>
  )
}
