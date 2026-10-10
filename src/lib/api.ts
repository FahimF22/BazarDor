import type { Product, Category } from "@/types";

const BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://openapi.programming-hero.com/api/bazardor";

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function getProducts(category?: string): Promise<Product[]> {
  const path = category ? `/products?category=${category}` : "/products";
  return fetchJson<Product[]>(path);
}

export async function getProduct(idOrSlug: string | number): Promise<Product | null> {
  try {
    return await fetchJson<Product>(`/products/${idOrSlug}`);
  } catch {
    const all = await getProducts();
    return all.find((p) => p.slug === idOrSlug || String(p.id) === String(idOrSlug)) || null;
  }
}

export async function getCategories(): Promise<Category[]> {
  return fetchJson<Category[]>("/categories");
}

export async function getCategory(slug: string): Promise<Category | null> {
  try {
    return await fetchJson<Category>(`/categories/${slug}`);
  } catch {
    const all = await getCategories();
    return all.find((c) => c.slug === slug) || null;
  }
}