import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // আপনার লগইন পেজের পাথ
  },
});

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/settings/:path*"],
};