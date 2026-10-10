export function toBn(num: number | string): string {
  const map: Record<string, string> = {
    "0": "০", "1": "১", "2": "২", "3": "৩", "4": "৪",
    "5": "৫", "6": "৬", "7": "৭", "8": "৮", "9": "৯",
  };
  return String(num).replace(/[0-9]/g, (d) => map[d] || d);
}

export function formatPrice(price: number): string {
  return `${toBn(price.toLocaleString("en-IN"))} টাকা`;
}

export function formatPct(pct: number): string {
  return `${toBn(Math.abs(pct).toFixed(1))}%`;
}

export function unitLabel(unit: string): string {
  const map: Record<string, string> = {
    kg: "প্রতি কেজি",
    liter: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
    pc: "প্রতি পিস",
  };
  return map[unit] || `প্রতি ${unit}`;
}

export function getBanglaDate(): string {
  const now = new Date();
  const days = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
  const months = [
    "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
    "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
  ];
  return `${days[now.getDay()]}, ${toBn(now.getDate())} ${months[now.getMonth()]} ${toBn(now.getFullYear())}`;
}

export function sortProducts(
  products: import("@/types").Product[],
  sort: import("@/types").SortOption
) {
  if (sort === "default") return products;
  const sorted = [...products];
  if (sort === "price-asc") sorted.sort((a, b) => a.today - b.today);
  if (sort === "price-desc") sorted.sort((a, b) => b.today - a.today);
  return sorted;
}

export function getTopMovers(
  products: import("@/types").Product[],
  dir: "up" | "down",
  limit = 6
) {
  return products
    .filter((p) => p.change.dir === dir)
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, limit);
}
