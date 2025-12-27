"use client"

import { useAuthStore } from "@/store/Auth";
import { useRouter } from "next/router";
import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hydrated = useAuthStore((state) => state.hydrated);
  const { session } = useAuthStore();
    const router = useRouter();

  React.useEffect(() => {
    if (hydrated && session) {
      router.replace("/"); // Redirect to home if already logged in
    }
  }, [hydrated, session, router]);

  if (!hydrated) {
    return null; // or a loading spinner
  }

  return <>{children}</>;
}