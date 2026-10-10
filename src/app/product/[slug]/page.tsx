import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getProduct, getProducts } from "@/lib/api";
import { formatPrice, formatPct, unitLabel, toBn } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(`/signin?callbackUrl=/product/${slug}`);
  }

  let product = await getProduct(slug);
  if (!product) {
    const all = await getProducts();
    product = all.find((p) => p.slug === slug) || null;
  }

  if (!product) {
    notFound();
  }

  const mins = product.markets.map((m) => m.min);
  const maxs = product.markets.map((m) => m.max);
  const minPrice = Math.min(...mins);
  const maxPrice = Math.max(...maxs);
  const avgPrice = Math.round(
    product.markets.reduce((s, m) => s + (m.min + m.max) / 2, 0) /
      product.markets.length
  );

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  const byDivision = product.markets.reduce<
    Record<string, typeof product.markets>
  >((acc, m) => {
    (acc[m.division] = acc[m.division] || []).push(m);
    return acc;
  }, {});

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <div className="text-6xl sm:text-7xl">{product.image}</div>
        <div className="space-y-2 flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold">{product.nameBn}</h1>
          <p className="text-base-content/70">
            {product.categoryNameBn} · {unitLabel(product.unit)}
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="badge badge-outline">{product.categoryNameBn}</span>
            <span className="badge badge-ghost">{unitLabel(product.unit)}</span>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <span className="text-2xl font-bold text-primary">
              {formatPrice(product.today)}
            </span>
            <span
              className={`badge ${
                isUp ? "badge-success" : isDown ? "badge-error" : "badge-ghost"
              }`}
            >
              {isUp ? "▲" : isDown ? "▼" : "—"} {formatPct(product.change.pct)}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="stat bg-base-200 rounded-box">
          <div className="stat-title">সর্বনিম্ন দাম</div>
          <div className="stat-value text-lg text-success">{formatPrice(minPrice)}</div>
        </div>
        <div className="stat bg-base-200 rounded-box">
          <div className="stat-title">সর্বোচ্চ দাম</div>
          <div className="stat-value text-lg text-error">{formatPrice(maxPrice)}</div>
        </div>
        <div className="stat bg-base-200 rounded-box">
          <div className="stat-title">গড় দাম</div>
          <div className="stat-value text-lg text-primary">{formatPrice(avgPrice)}</div>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">বাজারভিত্তিক আজকের দাম</h2>
        <div className="space-y-6">
          {Object.entries(byDivision).map(([division, markets]) => (
            <div key={division}>
              <h3 className="font-semibold text-base-content/80 mb-2">📍 {division}</h3>
              <div className="overflow-x-auto">
                <table className="table table-zebra table-sm">
                  <thead>
                    <tr>
                      <th>বাজার</th>
                      <th>সর্বনিম্ন</th>
                      <th>সর্বোচ্চ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {markets.map((m) => (
                      <tr key={m.market}>
                        <td>{m.market}</td>
                        <td className="text-success font-medium">{toBn(m.min)} টাকা</td>
                        <td className="text-error font-medium">{toBn(m.max)} টাকা</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Link href="/" className="btn btn-ghost btn-sm">
        ← হোমে ফিরে যান
      </Link>
    </div>
  );
}
