export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--line)] bg-[rgba(255,252,248,0.86)]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-6 py-10 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-lg font-semibold tracking-tight">OpenChair</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[color:var(--muted)]">
            Find nearby haircut shops fast with direct call buttons, public booking links, and simple open-now signals.
          </p>
        </div>
        <div className="text-sm text-[color:var(--muted)]">
          <p>OpenChair is rolling out across North Carolina market by market, starting around Lake Norman.</p>
          <p className="mt-1">OpenChair &copy; 2026</p>
        </div>
      </div>
    </footer>
  );
}
