"use client";

import type { Dict, Lang } from "@/lib/i18n";

interface Props {
  dict: Dict;
  lang: Lang;
  onToggleLang: () => void;
}

export function Nav({ dict, lang, onToggleLang }: Props) {
  const t = dict.nav;
  return (
    <header className="sticky top-0 z-50 border-b border-paper-line bg-paper/85 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink font-display text-lg font-bold text-masa-300">R</span>
          <span className="font-display text-xl font-semibold tracking-tight text-ink">Rancang</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="#how" className="text-sm text-ink-muted transition-colors hover:text-ink">{t.howItWorks}</a>
          <a href="#blueprint" className="text-sm text-ink-muted transition-colors hover:text-ink">{t.blueprint}</a>
          <a href="#faq" className="text-sm text-ink-muted transition-colors hover:text-ink">{t.faq}</a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleLang}
            className="rounded-full border border-paper-line px-3 py-1 font-mono text-xs font-semibold text-ink-soft transition-colors hover:border-ink"
            aria-label="Toggle language"
          >
            {lang === "en" ? "ID" : "EN"}
          </button>
          <a href="#top" className="hidden text-sm text-ink-muted hover:text-ink sm:block">{t.signIn}</a>
          <a href="#top" className="btn-primary px-4 py-2 text-sm">{t.signUp}</a>
        </div>
      </div>
    </header>
  );
}
