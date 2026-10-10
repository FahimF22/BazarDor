"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { getBanglaDate } from "@/lib/utils";
import type { Category } from "@/types";
import toast from "react-hot-toast";

interface Props {
  categories: Category[];
}

export default function Navbar({ categories }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const handleSignOut = async () => {
    await signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  };

  const isActive = (slug: string) => pathname === `/category/${slug}`;

  return (
    <header className="sticky top-0 z-50 bg-base-100 shadow-sm">
      <div className="navbar max-w-6xl mx-auto px-3 sm:px-4 min-h-14">
        <div className="navbar-start flex-1">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🛒</span>
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-lg sm:text-xl text-primary">বাজার দর</span>
              <span className="text-[10px] sm:text-xs text-base-content/60">
                {getBanglaDate()}
              </span>
            </div>
          </Link>
        </div>

        <div className="navbar-end gap-1 sm:gap-2">
          {isPending ? (
            <span className="loading loading-spinner loading-sm" />
          ) : session?.user ? (
            <>
              <Link href="/profile" className="btn btn-ghost btn-sm sm:btn-md gap-1">
                👤 {session.user.name || "প্রোফাইল"}
              </Link>
              <button onClick={handleSignOut} className="btn btn-outline btn-error btn-sm sm:btn-md">
                সাইন আউট
              </button>
            </>
          ) : (
            <>
              <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">সাইন ইন</Link>
              <Link href="/signup" className="btn btn-primary btn-sm sm:btn-md">সাইন আপ</Link>
            </>
          )}
        </div>
      </div>

      <div className="border-t border-base-200">
        <nav className="max-w-6xl mx-auto px-2 sm:px-4 overflow-x-auto">
          <ul className="flex gap-1 sm:gap-2 py-2 text-sm whitespace-nowrap">
            <li>
              <Link
                href="/"
                className={`btn btn-sm btn-ghost ${pathname === "/" ? "btn-active bg-primary/10 text-primary" : ""}`}
              >
                🏠 সব
              </Link>
            </li>
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/category/${cat.slug}`}
                  className={`btn btn-sm btn-ghost ${isActive(cat.slug) ? "btn-active bg-primary/10 text-primary font-semibold" : ""}`}
                >
                  {cat.icon} {cat.nameBn}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
