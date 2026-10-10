"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("ইমেইল ও পাসওয়ার্ড দিন");
      return;
    }
    setLoading(true);
    try {
      const { error } = await signIn.email({ email, password });
      if (error) {
        toast.error(error.message || "লগইন ব্যর্থ হয়েছে");
      } else {
        toast.success("সফলভাবে লগইন হয়েছে!");
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      toast.error("কিছু ভুল হয়েছে, আবার চেষ্টা করুন");
    } finally {
      setLoading(false);
    }
  };

  const handleSocial = async (provider: "google" | "github") => {
    await signIn.social({ provider, callbackURL: callbackUrl });
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body gap-4">
          <h1 className="card-title text-2xl justify-center">সাইন ইন</h1>
          <p className="text-center text-sm text-base-content/60">আপনার অ্যাকাউন্টে প্রবেশ করুন</p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="form-control">
              <label className="label"><span className="label-text">ইমেইল</span></label>
              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">পাসওয়ার্ড</span></label>
              <input
                type="password"
                className="input input-bordered w-full"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? <span className="loading loading-spinner loading-sm" /> : "লগইন"}
            </button>
          </form>

          <div className="divider text-xs">অথবা</div>

          <div className="flex flex-col gap-2">
            <button type="button" className="btn btn-outline gap-2" onClick={() => handleSocial("google")}>
              Google দিয়ে লগইন
            </button>
            <button type="button" className="btn btn-outline gap-2" onClick={() => handleSocial("github")}>
              GitHub দিয়ে লগইন
            </button>
          </div>

          <p className="text-center text-sm">
            অ্যাকাউন্ট নেই?{" "}
            <Link href="/signup" className="link link-primary">সাইন আপ করুন</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-20"><span className="loading loading-spinner loading-lg" /></div>}>
      <SignInForm />
    </Suspense>
  );
}