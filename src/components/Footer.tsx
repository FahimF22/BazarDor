export default function Footer() {
  return (
    <footer className="bg-base-200 border-t border-base-300 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-base-content/70">
        <p className="text-center sm:text-left">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>
        <p className="text-center sm:text-right italic text-xs sm:text-sm">
          “সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।”
        </p>
      </div>
    </footer>
  );
}
