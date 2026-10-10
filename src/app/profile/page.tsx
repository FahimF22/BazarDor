import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin?callbackUrl=/profile");
  }

  const user = session.user;

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body items-center text-center gap-4">
          <div className="avatar placeholder">
            <div className="bg-primary text-primary-content rounded-full w-20">
              <span className="text-3xl">
                {(user.name || user.email || "U")[0].toUpperCase()}
              </span>
            </div>
          </div>
          <h1 className="text-2xl font-bold">{user.name || "ব্যবহারকারী"}</h1>
          <p className="text-base-content/60">{user.email}</p>
          <div className="divider" />
          <Link href="/update-profile" className="btn btn-primary w-full">
            তথ্য আপডেট করুন
          </Link>
          <Link href="/" className="btn btn-ghost btn-sm">
            ← হোমে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}
