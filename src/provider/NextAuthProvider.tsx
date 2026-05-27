"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

// children এর টাইপ নির্ধারণ করে দেওয়া হয়েছে
const NextAuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthProvider;