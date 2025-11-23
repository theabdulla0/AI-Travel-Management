// app/components/header.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";
import { Menu, LogOut } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
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
            <div className="h-10 flex items-center">
              {!isLoaded ? (
                // Loading skeleton - matches button size
                <div className="h-10 w-20 animate-pulse rounded-full bg-muted" />
              ) : isSignedIn && user ? (
                // User avatar
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full p-0"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={user.imageUrl}
                      alt={user.fullName || "User"}
                    />
                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              ) : (
                // Login button
                <Button
                  size="lg"
                  className="rounded-full text-sm sm:text-base"
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
