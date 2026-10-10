import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 text-center md:text-left space-y-4">
          <p className="text-sm font-medium text-primary tracking-wide">🇧🇩 বাংলাদেশের বাজার দর</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
            প্রয়োজনীয় পণ্যের <span className="text-primary">দাম</span> এক নজরে
          </h1>
          <p className="text-base-content/70 text-base sm:text-lg max-w-md mx-auto md:mx-0">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস — আজকের বাজার দর জানুন এবং সঠিক সিদ্ধান্ত নিন।
          </p>
          <Link href="/#সব-পণ্য" className="btn btn-primary btn-sm sm:btn-md">
            সব পণ্য দেখুন ↓
          </Link>
        </div>
        <div className="flex-1 flex justify-center">
          <Image
            src="/bazar-hero.png"
            alt="বাজার দর"
            width={315}
            height={263}
            className="w-full max-w-xs sm:max-w-sm object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
