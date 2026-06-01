import type { Dict } from "@/lib/i18n";

export function Footer({ dict }: { dict: Dict }) {
  const t = dict.footer;
  return (
    <footer className="border-t border-paper-line bg-ink py-14 text-paper">
      <div className="container-x grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-masa-300 font-display text-lg font-bold text-ink">R</span>
            <span className="font-display text-xl font-semibold">Rancang</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-paper/60">{t.tagline}</p>
        </div>
        <div>
          <div className="font-mono text-xs uppercase tracking-wider text-masa-300">{t.product}</div>
          <ul className="mt-3 space-y-2 text-sm text-paper/70">
            <li><a href="#how" className="hover:text-paper">How it works</a></li>
            <li><a href="#blueprint" className="hover:text-paper">The blueprint</a></li>
            <li><a href="#top" className="hover:text-paper">Workspace</a></li>
          </ul>
        </div>
        <div>
          <div className="font-mono text-xs uppercase tracking-wider text-masa-300">{t.resources}</div>
          <ul className="mt-3 space-y-2 text-sm text-paper/70">
            <li><a href="#faq" className="hover:text-paper">FAQ</a></li>
            <li><a href="#top" className="hover:text-paper">Documentation</a></li>
            <li><a href="#top" className="hover:text-paper">Status</a></li>
          </ul>
        </div>
        <div>
          <div className="font-mono text-xs uppercase tracking-wider text-masa-300">{t.account}</div>
          <ul className="mt-3 space-y-2 text-sm text-paper/70">
            <li><a href="#top" className="hover:text-paper">Sign in</a></li>
            <li><a href="#top" className="hover:text-paper">Sign up free</a></li>
            <li><a href="#top" className="hover:text-paper">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="container-x mt-10 border-t border-white/10 pt-6">
        <p className="font-mono text-xs text-paper/50">© 2026 Rancang · The planning layer for AI builders · operational</p>
      </div>
    </footer>
  );
}
