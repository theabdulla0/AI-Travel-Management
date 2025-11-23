// app/provider.tsx
"use client";

import React, { useContext, useEffect, useState } from "react";
import Header from "./components/header";
import { useUser } from "@clerk/nextjs";
import { createOrUpdateUser } from "./actions/user";
import { UserDetailContext } from "../../context/UserDetailContext";

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, isLoaded, isSignedIn } = useUser();
  const [userDetail, setUserDetail] = useState<any>("");

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      checkUser();
    }
  }, [user?.id, isLoaded, isSignedIn]);

  const checkUser = async () => {
    if (!user) return;

    try {
      console.log("Provider: Starting user sync for Clerk ID:", user.id);
      const result = await createOrUpdateUser({
        clerkId: user.id,
        email: user.primaryEmailAddress?.emailAddress ?? "",
        firstname: user.firstName ?? "",
        lastname: user.lastName ?? "",
        imageUrl: user.imageUrl ?? "",
      });
      setUserDetail(result);
      console.log("Provider: User sync successful. Result:", result);
    } catch (error) {
      console.error("Provider: User sync FAILED:", error);
    }
  };
  if (!isLoaded) {
    return (
      <div>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      </div>
    );
  }

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <div>
        <Header />
        {children}
      </div>
    </UserDetailContext.Provider>
  );
}

export default Provider;

export const useUserDetail = () => {
  return useContext(UserDetailContext);
};
