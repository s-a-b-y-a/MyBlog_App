"use client";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";

export default function ClientProviders({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Navbar />
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  );
}
