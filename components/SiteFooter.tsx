import Link from "next/link";
import { locationPages } from "@/data/locationPages";

const footerPageIds = [
  "mooresville-haircuts",
  "mooresville-walk-in-haircuts",
  "cornelius-haircuts",
  "huntersville-haircuts",
  "denver-haircuts",
  "lake-norman-haircuts",
  "lake-norman-open-now-haircuts",
  "lake-norman-kids-haircuts"
];

const footerPages = footerPageIds
  .map((pageId) => locationPages.find((page) => page.id === pageId))
  .filter((page): page is (typeof locationPages)[number] => Boolean(page));

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--line)] bg-[rgba(255,252,248,0.86)]">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-lg font-semibold tracking-tight">ChairRadar</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[color:var(--muted)]">
            Find nearby haircut shops fast with direct call buttons, public booking links, and simple open-now signals.
          </p>
          <div className="mt-5 text-sm text-[color:var(--muted)]">
            <p>ChairRadar is rolling out across North Carolina market by market, starting around Lake Norman.</p>
            <p className="mt-1">ChairRadar &copy; 2026</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">
            Popular haircut searches
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {footerPages.map((page) => (
              <Link
                key={page.id}
                href={page.href}
                className="text-sm font-medium text-[color:var(--muted)] underline decoration-[color:var(--line)] underline-offset-4 transition hover:text-[color:var(--foreground)]"
              >
                {page.metaTitle}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
