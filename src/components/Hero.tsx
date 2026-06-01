"use client";

import { useState } from "react";
import type { Blueprint, Lang } from "@/lib/blueprint/types";
import type { Dict } from "@/lib/i18n";

interface Props {
  dict: Dict;
  lang: Lang;
  onResult: (bp: Blueprint) => void;
}

export function Hero({ dict, lang, onResult }: Props) {
  const t = dict.hero;
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    const value = idea.trim();
    if (value.length < 8) {
      setError(lang === "id" ? "Tulis ide setidaknya satu kalimat singkat." : "Describe your idea in at least a short sentence.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/blueprint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea: value, lang }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? dict.common.error);
      } else {
        onResult(data.blueprint as Blueprint);
      }
    } catch {
      setError(dict.common.error);
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      submit();
    }
  }

  return (
    <section className="relative overflow-hidden">
      <div className="container-x grid gap-12 py-16 md:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        {/* Left: copy */}
        <div className="animate-rise">
          <span className="chip border-masa-200 bg-masa-50 text-masa-700">{t.badge}</span>
          <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.02] tracking-tight text-ink sm:text-6xl">
            {t.titleA}
            <br />
            <span className="text-masa-600">{t.titleB}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">{t.subtitle}</p>

          <div className="mt-8 flex flex-wrap gap-6">
            {t.stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl font-semibold text-ink">{s.value}</div>
                <div className="text-sm text-ink-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: cooker */}
        <div className="animate-rise" style={{ animationDelay: "120ms" }}>
          <div className="card overflow-hidden">
            <div className="flex items-center justify-between border-b border-paper-line bg-ink px-5 py-3">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-masa-200">
                Rancang · {loading ? "cooking…" : "idle, ready"}
              </span>
              <span className={`h-2.5 w-2.5 rounded-full ${loading ? "animate-pulse-soft bg-masa-300" : "bg-lime-500"}`} />
            </div>
            <div className="p-5">
              <label className="eyebrow">What do you want to build?</label>
              <textarea
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                onKeyDown={onKeyDown}
                rows={4}
                placeholder={t.placeholder}
                className="mt-2 w-full resize-none rounded-xl border border-paper-line bg-paper px-4 py-3 text-ink outline-none transition-colors focus:border-masa-400"
              />
              {error && <p className="mt-2 text-sm text-chili-500">{error}</p>}

              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="hidden font-mono text-[11px] text-ink-muted sm:block">⌘ / Ctrl + ↵</span>
                <button onClick={submit} disabled={loading} className="btn-primary w-full sm:w-auto">
                  {loading ? t.cooking : t.cta}
                </button>
              </div>

              <div className="mt-5 border-t border-paper-line pt-4">
                <span className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">{t.tryLabel}</span>
                <div className="mt-2 flex flex-col gap-1.5">
                  {t.examples.map((ex) => (
                    <button
                      key={ex}
                      onClick={() => setIdea(ex)}
                      className="truncate text-left text-sm text-ink-soft transition-colors hover:text-masa-700"
                      title={ex}
                    >
                      → {ex}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-center">
            <span className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">{t.worksWith}:</span>
            {["Next.js", "PostgreSQL", "Drizzle", "Tailwind", "shadcn/ui"].map((w) => (
              <span key={w} className="chip">{w}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
