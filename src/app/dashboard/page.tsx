import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const role = (session.user as any)?.role;

  // ROLE BASED REDIRECT
  if (role === "ADMIN") {
    redirect("/dashboard/admin");
  }

  if (role === "ORGANIZER") {
    redirect("/dashboard/organizer");
  }

  redirect("/dashboard/participant");
}