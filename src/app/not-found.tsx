import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
      <p className="text-7xl">🔍</p>
      <h1 className="text-3xl font-bold">৪০৪ — পেজ পাওয়া যায়নি</h1>
      <p className="text-base-content/70">
        আপনি যে পেজটি খুঁজছেন তা বিদ্যমান নেই বা সরানো হয়েছে।
      </p>
      <Link href="/" className="btn btn-primary">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
