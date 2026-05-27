 // আপনার auth কনফিগ ফাইল থেকে ইমপোর্ট করুন

import { auth } from "./lib/auth";

export default auth((req) => {
  // যদি ইউজার লগইন করা না থাকে এবং তারা ড্যাশবোর্ড বা প্রোটেক্টেড রুটে যাওয়ার চেষ্টা করে
  if (!req.auth && req.nextUrl.pathname !== "/login") {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  // আপনার ড্যাশবোর্ড এবং প্রোটেক্টেড রুটগুলো এখানে রাখুন
  matcher: ["/dashboard/:path*", "/profile/:path*", "/settings/:path*"],
};