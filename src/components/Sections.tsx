"use client";

import { useState } from "react";
import type { Dict } from "@/lib/i18n";

export function HowItWorks({ dict }: { dict: Dict }) {
  const t = dict.how;
  return (
    <section id="how" className="border-t border-paper-line py-20">
      <div className="container-x">
        <span className="eyebrow">{t.eyebrow}</span>
        <h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold leading-tight text-ink">{t.title}</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {t.steps.map((s, i) => (
            <div key={s.n} className="card animate-rise p-6" style={{ animationDelay: `${i * 90}ms` }}>
              <div className="font-mono text-sm text-masa-600">STEP {s.n}</div>
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Layers({ dict }: { dict: Dict }) {
  const t = dict.layers;
  return (
    <section id="blueprint" className="border-t border-paper-line bg-ink py-20 text-paper">
      <div className="container-x">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-masa-300">{t.eyebrow}</span>
        <h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold leading-tight">{t.title}</h2>
        <p className="mt-4 max-w-2xl text-paper/70">{t.subtitle}</p>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {t.items.map((it) => (
            <div key={it.n} className="bg-ink p-6 transition-colors hover:bg-ink-soft">
              <div className="font-mono text-sm text-masa-300">{it.n}</div>
              <h3 className="mt-2 font-display text-lg font-semibold">{it.title}</h3>
              <p className="mt-1 text-sm text-paper/60">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Why({ dict }: { dict: Dict }) {
  const t = dict.why;
  return (
    <section className="border-t border-paper-line py-20">
      <div className="container-x">
        <span className="eyebrow">{t.eyebrow}</span>
        <h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold leading-tight text-ink">{t.title}</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="card border-chili-400/30 p-6">
            <div className="font-mono text-xs uppercase tracking-wider text-chili-500">{t.without}</div>
            <ul className="mt-4 space-y-3">
              {t.withoutItems.map((it, i) => (
                <li key={i} className="flex gap-2 text-sm text-ink-muted">
                  <span className="text-chili-500">✕</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card border-lime-500/30 bg-masa-50 p-6">
            <div className="font-mono text-xs uppercase tracking-wider text-lime-600">{t.with}</div>
            <ul className="mt-4 space-y-3">
              {t.withItems.map((it, i) => (
                <li key={i} className="flex gap-2 text-sm text-ink-soft">
                  <span className="text-lime-500">✓</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Faq({ dict }: { dict: Dict }) {
  const t = dict.faq;
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="border-t border-paper-line py-20">
      <div className="container-x max-w-3xl">
        <span className="eyebrow">{t.eyebrow}</span>
        <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-ink">{t.title}</h2>
        <div className="mt-10 divide-y divide-paper-line border-y border-paper-line">
          {t.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg font-medium text-ink">{item.q}</span>
                  <span className={`font-mono text-xl text-masa-600 transition-transform ${isOpen ? "rotate-45" : ""}`}>+</span>
                </button>
                <div
                  className="grid transition-all duration-300"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 text-ink-muted">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
