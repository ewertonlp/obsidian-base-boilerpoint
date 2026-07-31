"use client"

import { useState } from "react"
import { Camera, Mail, User, Save, User2 } from "lucide-react"
import { Button } from "@/app/components/ui/Button" 
import { Input } from "@/app/components/ui/Input"   
import { Card } from "@/app/components/ui/Card"        
import { toast } from "sonner"

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false)

  // Simula o salvamento no Supabase
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Aqui entrará a sua Server Action do Supabase no futuro:
      // await updateProfileAction(formData);
      
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success("Profile updated successfully!")
    } catch (error) {
      toast.error("Failed to update profile", {
        description: "Please try again later."
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <div className="mb-8">
        <div className="flex items-center gap-2">

          <User2 className="w-6 h-6 text-accent-blue" />
        <h1 className="text-2xl font-bold tracking-tight text-text-primary">
          Profile Settings
        </h1>
        </div>
        <p className="text-text-secondary mt-1">
          Manage your account details and public profile.
        </p>
      </div>

      <div className="space-y-6">  
        
        <Card className="p-6">
          <h2 className="text-lg font-medium text-text-primary mb-4">Profile Picture</h2>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative h-24 w-24 shrink-0 rounded-full bg-obsidian-surface border border-obsidian-border/50 flex items-center justify-center group overflow-hidden">
              <User className="h-10 w-10 text-text-secondary" />
           
              <label className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="h-6 w-6 text-white" />
                <input type="file" className="hidden" accept="image/*" />
              </label>
            </div>
            
            <div>
              <div className="flex gap-3">
                <Button variant="secondary" size="sm">
                  Upload new
                </Button>
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-500/80 hover:bg-red-500/10 transition-colors">
                  Remove
                </Button>
              </div>
              <p className="text-xs text-text-secondary mt-3">
                Recommended size: 256x256px. Maximum size: 2MB.
              </p>
            </div>
          </div>
        </Card>

       
        <Card className="p-6">
          <h2 className="text-lg font-medium text-text-primary mb-4">Personal Information</h2>
          
          <form onSubmit={handleSaveProfile} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input 
                label="First Name" 
                type="text" 
                defaultValue="John" 
                icon={<User className="h-4 w-4" />} 
              />
              <Input 
                label="Last Name" 
                type="text" 
                defaultValue="Doe" 
                icon={<User className="h-4 w-4" />} 
              />
            </div>

            <Input 
              label="Email Address" 
              type="email" 
              defaultValue="you@example.com" 
              icon={<Mail className="h-4 w-4" />} 
              disabled 
            />

        
            <div className="pt-4 mt-6 border-t border-obsidian-border/50 flex justify-end">
              <Button type="submit" isLoading={isLoading} className="bg-accent-blue text-white hover:bg-accent-blue/90 w-full sm:w-auto">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </form>
        </Card>

      </div>
    </div>
  );
}