import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { ShopCard } from "@/components/ShopCard";
import { SiteFooter } from "@/components/SiteFooter";
import {
  getLocationPageBySegments,
  getLocationPageShops,
  getRelatedLocationPages,
  getShopLocationSummary,
  locationPages
} from "@/data/locationPages";
import { SITE_URL } from "@/lib/site";

type LocationLandingPageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

export function generateStaticParams() {
  return locationPages.map((page) => ({
    slug: page.segments
  }));
}

export async function generateMetadata({
  params
}: LocationLandingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getLocationPageBySegments(slug);

  if (!page) {
    return {
      title: "Location not found"
    };
  }

  const url = `${SITE_URL}${page.href}`;

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical: url
    },
    openGraph: {
      title: `${page.metaTitle} | ChairRadar`,
      description: page.metaDescription,
      url,
      siteName: "ChairRadar",
      type: "website"
    }
  };
}

export default async function LocationLandingPage({
  params
}: LocationLandingPageProps) {
  const { slug } = await params;
  const page = getLocationPageBySegments(slug);

  if (!page) {
    notFound();
  }

  const pageShops = getLocationPageShops(page);
  const relatedPages = getRelatedLocationPages(page);
  const summary = getShopLocationSummary(pageShops);

  return (
    <main>
      <Header />

      <section className="px-4 pb-10 pt-10 sm:px-6 lg:px-8 lg:pb-14">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.62fr_0.38fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
              {page.eyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              {page.heading}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
              {page.description}
            </p>
            <div className="mt-8 max-w-3xl">
              <SearchBar defaultLocation={page.searchLocation} />
            </div>
          </div>

          <aside className="rounded-[34px] border border-[color:var(--line)] bg-white/82 p-6 shadow-[var(--shadow)]">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">
              ChairRadar coverage
            </p>
            <p className="mt-4 text-3xl font-semibold tracking-tight">
              {pageShops.length} real listings
            </p>
            <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
              {page.intro}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {summary.zips.map((zip) => (
                <span
                  key={zip}
                  className="rounded-full border border-[color:var(--line)] bg-[color:var(--panel-strong)] px-3 py-2 text-sm font-medium"
                >
                  {zip}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">
                Nearby haircut options
              </h2>
              <p className="mt-3 max-w-2xl text-[color:var(--muted)]">
                Tap to call, book on the shop site, visit the website, or get directions.
                ChairRadar tracks real outbound clicks, not fake booking counters.
              </p>
            </div>
            <Link
              href={`/search?query=Haircut&location=${encodeURIComponent(page.searchLocation)}`}
              className="inline-flex w-fit rounded-full border border-[color:var(--line)] bg-white px-5 py-3 text-sm font-semibold shadow-[0_10px_25px_rgba(44,30,18,0.06)]"
            >
              Open search results
            </Link>
          </div>

          <div className="mt-8 grid gap-6">
            {pageShops.map((shop) => (
              <ShopCard
                key={shop.id}
                shop={shop}
                sourcePage={`seo_${page.id}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[34px] border border-[color:var(--line)] bg-white/78 p-6 shadow-[var(--shadow)] sm:p-8">
          <h2 className="text-3xl font-semibold tracking-tight">
            More Lake Norman haircut pages
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {relatedPages.map((relatedPage) => (
              <Link
                key={relatedPage.id}
                href={relatedPage.href}
                className="rounded-[26px] border border-[color:var(--line)] bg-[color:var(--panel-strong)] p-5 transition hover:-translate-y-1"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
                  {relatedPage.areaName}
                </p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight">
                  {relatedPage.heading}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                  {relatedPage.metaDescription}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
