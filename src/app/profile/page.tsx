"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { getUserByClerkId, updateUserProfile } from "../actions/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Save, X, User2, Mail, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  _id: string;
  clerkId: string;
  firstname: string;
  lastname?: string;
  email: string;
  imageUrl: string;
  createdAt: number;
  updatedAt: number;
}

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    imageUrl: "",
  });

  const fetchProfile = useCallback(async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      const userData = await getUserByClerkId(user.id);
      setProfile(userData);
      setFormData({
        firstname: userData.firstname || "",
        lastname: userData.lastname || "",
        email: userData.email || "",
        imageUrl: userData.imageUrl || "",
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast({
        title: "Error",
        description: "Failed to load profile data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  useEffect(() => {
    if (isLoaded && user) {
      fetchProfile();
    } else if (isLoaded && !user) {
      router.push("/sign-in");
    }
  }, [isLoaded, user, router, fetchProfile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.id) return;
    
    // Validation
    if (!formData.firstname.trim()) {
      toast({
        title: "Validation Error",
        description: "First name is required",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    try {
      setSaving(true);
      await updateUserProfile(user.id, formData);
      
      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
      
      await fetchProfile(); // Refresh profile data
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        firstname: profile.firstname || "",
        lastname: profile.lastname || "",
        email: profile.email || "",
        imageUrl: profile.imageUrl || "",
      });
    }
  };

  const getUserInitials = () => {
    const firstName = formData.firstname || "";
    const lastName = formData.lastname || "";
    return `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase() || "U";
  };

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8">
            <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
            <p className="text-blue-100">Manage your personal information</p>
          </div>

          {/* Avatar Section */}
          <div className="relative -mt-16 flex justify-center px-8">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-white dark:border-neutral-900 shadow-xl">
                <AvatarImage src={formData.imageUrl} alt={formData.firstname} />
                <AvatarFallback className="text-4xl">{getUserInitials()}</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6 mt-4">
            {/* First Name */}
            <div className="space-y-2">
              <Label htmlFor="firstname" className="flex items-center gap-2">
                <User2 className="w-4 h-4" />
                First Name *
              </Label>
              <Input
                id="firstname"
                type="text"
                value={formData.firstname}
                onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                className="w-full"
                placeholder="Enter your first name"
                required
              />
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <Label htmlFor="lastname" className="flex items-center gap-2">
                <User2 className="w-4 h-4" />
                Last Name
              </Label>
              <Input
                id="lastname"
                type="text"
                value={formData.lastname}
                onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                className="w-full"
                placeholder="Enter your last name"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <Label htmlFor="imageUrl" className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Profile Image URL
              </Label>
              <Input
                id="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Account Info */}
            <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800">
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-4">
                Account Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-neutral-500 dark:text-neutral-400">Account Created</p>
                  <p className="font-medium text-neutral-900 dark:text-white">
                    {profile ? new Date(profile.createdAt).toLocaleDateString() : "-"}
                  </p>
                </div>
                <div>
                  <p className="text-neutral-500 dark:text-neutral-400">Last Updated</p>
                  <p className="font-medium text-neutral-900 dark:text-white">
                    {profile ? new Date(profile.updatedAt).toLocaleDateString() : "-"}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t border-neutral-200 dark:border-neutral-800">
              <Button
                type="submit"
                disabled={saving}
                className="flex-1 sm:flex-none"
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={saving}
                className="flex-1 sm:flex-none"
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
