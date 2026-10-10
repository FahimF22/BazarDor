"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp, signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("সব ফিল্ড পূরণ করুন");
      return;
    }
    if (password.length < 6) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");
      return;
    }
    setLoading(true);
    try {
      const { error } = await signUp.email({ email, password, name });
      if (error) {
        toast.error(error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
      } else {
        toast.success("সফলভাবে রেজিস্টার হয়েছে!");
        router.push("/");
        router.refresh();
      }
    } catch {
      toast.error("কিছু ভুল হয়েছে, আবার চেষ্টা করুন");
    } finally {
      setLoading(false);
    }
  };

  const handleSocial = async (provider: "google" | "github") => {
    await signIn.social({ provider, callbackURL: "/" });
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body gap-4">
          <h1 className="card-title text-2xl justify-center">সাইন আপ</h1>
          <p className="text-center text-sm text-base-content/60">নতুন অ্যাকাউন্ট তৈরি করুন</p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="form-control">
              <label className="label"><span className="label-text">নাম</span></label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="আপনার নাম"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
                placeholder="কমপক্ষে ৬ অক্ষর"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? <span className="loading loading-spinner loading-sm" /> : "রেজিস্টার"}
            </button>
          </form>

          <div className="divider text-xs">অথবা</div>

          <div className="flex flex-col gap-2">
            <button type="button" className="btn btn-outline gap-2" onClick={() => handleSocial("google")}>
              Google দিয়ে সাইন আপ
            </button>
            <button type="button" className="btn btn-outline gap-2" onClick={() => handleSocial("github")}>
              GitHub দিয়ে সাইন আপ
            </button>
          </div>

          <p className="text-center text-sm">
            ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
            <Link href="/signin" className="link link-primary">সাইন ইন করুন</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
