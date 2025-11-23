// app/components/header.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";
import { Menu, LogOut, User2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { useUser, useClerk } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Header() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navItems = [
    { id: 1, title: "Home", href: "/" },
    { id: 2, title: "Create Trip", href: "/create-new-trip" },
    { id: 3, title: "View Trips", href: "/my-trips" },
    { id: 4, title: "About", href: "/about" },
  ];

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  const baseLink =
    "px-3 py-1 text-md font-medium transition-colors hover:rounded-sm";
  const idle = "text-muted-foreground hover:text-foreground hover:bg-primary";
  const active = "text-foreground bg-primary rounded-sm";

  const getUserInitials = () => {
    if (!user) return "U";
    const firstName = user.firstName || "";
    const lastName = user.lastName || "";
    return `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase() || "U";
  };

  return (
    <>
      <div className="fixed top-0 inset-x-0 z-50 border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand */}
          <Link href="/" className="flex flex-col leading-none">
            <span className="text-xl font-semibold tracking-tight">
              Travelo
            </span>
            <span className="hidden sm:block text-xs text-muted-foreground">
              — smart travel —
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`${baseLink} ${isActive ? active : idle}`}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA - Always render the container */}
          <div className="hidden md:block">
            {/* Always render a consistent height container */}
            <div className="h-12 flex items-center">
              {!isLoaded ? (
                // Loading skeleton - matches button size
                <div className="h-12 w-24 animate-pulse rounded-full bg-gradient-to-r from-muted via-muted/50 to-muted" />
              ) : isSignedIn && user ? (
                // Enhanced User Profile Section
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-12 rounded-full pl-2 pr-4 hover:bg-accent/50 transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-3">
                        {/* Avatar with gradient border and status indicator */}
                        <div className="relative">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-75 group-hover:opacity-100 blur-sm transition duration-300"></div>
                          <Avatar className="relative h-9 w-9 ring-2 ring-background">
                            <AvatarImage
                              src={user.imageUrl}
                              alt={user.fullName || "User"}
                              className="object-cover"
                            />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-sm">
                              {getUserInitials()}
                            </AvatarFallback>
                          </Avatar>
                          {/* Online status indicator */}
                          <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-background"></div>
                        </div>
                        
                        {/* User name with truncation */}
                        <span className="text-sm font-medium max-w-[120px] truncate group-hover:text-foreground transition-colors">
                          {user.firstName || "User"}
                        </span>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  
                  {/* Enhanced Dropdown Menu */}
                  <DropdownMenuContent 
                    align="end" 
                    className="w-72 p-2 mt-2 shadow-2xl border-2 animate-in slide-in-from-top-2"
                  >
                    {/* User Info Header */}
                    <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 p-4 mb-2">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12 ring-2 ring-white/20">
                          <AvatarImage
                            src={user.imageUrl}
                            alt={user.fullName || "User"}
                            className="object-cover"
                          />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                            {getUserInitials()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold truncate">
                            {user.fullName || user.firstName}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {user.primaryEmailAddress?.emailAddress}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-xs text-green-600 dark:text-green-400 font-medium">Active</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <DropdownMenuSeparator className="my-2" />
                    
                    {/* Profile Menu Item */}
                    <DropdownMenuItem asChild>
                      <Link 
                        href="/profile" 
                        className="cursor-pointer rounded-md px-3 py-2.5 flex items-center gap-3 hover:bg-accent transition-colors"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                          <User2 className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Profile Settings</p>
                          <p className="text-xs text-muted-foreground">Manage your account</p>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator className="my-2" />
                    
                    {/* Logout Menu Item */}
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer rounded-md px-3 py-2.5 flex items-center gap-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 focus:bg-red-50 dark:focus:bg-red-950/20 focus:text-red-600 dark:focus:text-red-400 transition-colors"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10">
                        <LogOut className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Sign Out</p>
                        <p className="text-xs opacity-75">See you soon!</p>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                // Enhanced Login button
                <Button
                  size="lg"
                  className="rounded-full text-sm sm:text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
                  asChild
                >
                  <Link href="/sign-in">Login</Link>
                </Button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 sm:w-96">
                <SheetHeader className="pb-4">
                  <SheetTitle className="text-2xl">Travelo</SheetTitle>
                </SheetHeader>

                <div className="flex h-full flex-col gap-6 py-4">
                  <nav className="flex flex-col gap-2">
                    {navItems.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.id}
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={`rounded-md px-3 py-3 text-base font-medium transition-colors ${
                            isActive ? active : idle
                          }`}
                        >
                          {item.title}
                        </Link>
                      );
                    })}
                  </nav>

                  <div className="mt-auto">
                    {!isLoaded ? (
                      <div className="h-12 w-full animate-pulse rounded-md bg-muted" />
                    ) : isSignedIn ? (
                      <Button
                        className="w-full rounded-md"
                        variant="outline"
                        size="lg"
                        onClick={async () => {
                          setOpen(false);
                          await handleLogout();
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </Button>
                    ) : (
                      <Button
                        className="w-full rounded-md"
                        size="lg"
                        onClick={() => {
                          setOpen(false);
                          router.push("/sign-in");
                        }}
                      >
                        Sign In
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>
      </div>
      <div className="h-16 w-full" aria-hidden="true" />
    </>
  );
}

export default Header;
