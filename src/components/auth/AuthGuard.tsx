"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
  loadingComponent?: React.ReactNode;
}

/**
 * AuthGuard component that protects routes requiring authentication
 * Redirects unauthenticated users to sign-in page
 */
export function AuthGuard({
  children,
  redirectTo = "/sign-in",
  loadingComponent,
}: AuthGuardProps) {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      // Save the current path to redirect back after login
      const currentPath = window.location.pathname;
      const redirectUrl = `${redirectTo}?redirect_url=${encodeURIComponent(currentPath)}`;
      router.push(redirectUrl);
    }
  }, [isLoaded, isSignedIn, router, redirectTo]);

  // Show loading state while checking authentication
  if (!isLoaded) {
    return (
      loadingComponent || (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin mx-auto mb-4" />
            <p className="text-neutral-600 dark:text-neutral-400">
              Verifying authentication...
            </p>
          </div>
        </div>
      )
    );
  }

  // Don't render children if not signed in (will redirect)
  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-blue-600 dark:text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
            Authentication Required
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            You need to be logged in to access this page. Redirecting to sign in...
          </p>
          <Loader2 className="w-6 h-6 text-blue-500 animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  // User is authenticated, render children
  return <>{children}</>;
}
