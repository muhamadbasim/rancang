"use client";

import { useState } from "react";
import type { Blueprint } from "@/lib/blueprint/types";
import type { Dict } from "@/lib/i18n";
import { ReadinessGauge } from "./ReadinessGauge";

interface Props {
  blueprint: Blueprint;
  dict: Dict;
  onReset: () => void;
}

function LayerCard({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="card animate-rise p-6">
      <div className="mb-4 flex items-center gap-3">
        <span className="font-mono text-xs text-masa-600">{n}</span>
        <h3 className="font-display text-xl font-semibold text-ink">{title}</h3>
      </div>
      {children}
    </section>
  );
}

export function BlueprintResult({ blueprint: bp, dict, onReset }: Props) {
  const t = dict.result;
  const [copied, setCopied] = useState(false);

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(bp.buildPrompt);
    } catch {
      // Fallback for environments without async clipboard.
      const ta = document.createElement("textarea");
      ta.value = bp.buildPrompt;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="container-x py-12">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <button onClick={onReset} className="mb-3 font-mono text-xs uppercase tracking-wider text-ink-muted hover:text-ink">
            {t.back}
          </button>
          <h2 className="font-display text-4xl font-semibold text-ink">{bp.productName}</h2>
          <p className="mt-1 chip">{bp.domain.toUpperCase()} · {t.title}</p>
        </div>
        <div className="card px-5 py-4">
          <ReadinessGauge score={bp.readiness.score} label={t.readiness} />
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* 01 Summary */}
        <LayerCard n="01" title={t.summary}>
          <p className="text-sm leading-relaxed text-ink-soft">{bp.productSummary}</p>
        </LayerCard>

        {/* 07 ROI */}
        <LayerCard n="07" title={t.roi}>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-masa-50 p-3 text-center">
              <div className="font-display text-2xl font-semibold text-masa-700">{bp.roi.hoursSavedPerBlueprint}</div>
              <div className="mt-1 text-[11px] text-ink-muted">{t.hoursSaved}</div>
            </div>
            <div className="rounded-xl bg-masa-50 p-3 text-center">
              <div className="font-display text-2xl font-semibold text-masa-700">{bp.roi.speedupFactor}{t.faster}</div>
              <div className="mt-1 text-[11px] text-ink-muted">&nbsp;</div>
            </div>
            <div className="rounded-xl bg-masa-50 p-3 text-center">
              <div className="font-display text-2xl font-semibold text-masa-700">{bp.roi.revisionReductionPct}{t.revision}</div>
              <div className="mt-1 text-[11px] text-ink-muted">&nbsp;</div>
            </div>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-ink-muted">{bp.roi.rationale}</p>
        </LayerCard>

        {/* 02 Roles */}
        <LayerCard n="02" title={t.roles}>
          <ul className="space-y-3">
            {bp.roles.map((r) => (
              <li key={r.name} className="rounded-xl border border-paper-line p-3">
                <div className="font-medium text-ink">{r.name}</div>
                <div className="mt-1 text-xs text-ink-muted">
                  <span className="font-mono uppercase tracking-wide">{t.permissions}: </span>
                  {r.permissions.join(" · ")}
                </div>
              </li>
            ))}
          </ul>
        </LayerCard>

        {/* 05 Integrations */}
        <LayerCard n="05" title={t.integrations}>
          <ul className="space-y-2">
            {bp.integrations.map((i) => (
              <li key={i.name} className="flex items-start gap-2 text-sm">
                <span className="chip mt-0.5">{i.category}</span>
                <span className="text-ink-soft">
                  <span className="font-medium text-ink">{i.name}</span> — {i.purpose}
                </span>
              </li>
            ))}
          </ul>
        </LayerCard>

        {/* 03 Schema (full width) */}
        <div className="lg:col-span-2">
          <LayerCard n="03" title={t.schema}>
            <div className="grid gap-4 md:grid-cols-2">
              {bp.schema.map((tbl) => (
                <div key={tbl.name} className="overflow-hidden rounded-xl border border-paper-line">
                  <div className="border-b border-paper-line bg-ink px-4 py-2 font-mono text-sm text-masa-200">
                    {tbl.name}
                  </div>
                  <table className="w-full text-left text-xs">
                    <tbody>
                      {tbl.columns.map((c) => (
                        <tr key={c.name} className="border-b border-paper-line/70 last:border-0">
                          <td className="px-4 py-1.5 font-mono text-ink">{c.name}</td>
                          <td className="px-4 py-1.5 font-mono text-masa-700">{c.type}</td>
                          <td className="px-4 py-1.5 text-ink-muted">{c.note ?? ""}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {tbl.relations.length > 0 && (
                    <div className="bg-masa-50 px-4 py-2 text-[11px] text-ink-muted">
                      <span className="font-mono uppercase tracking-wide">{t.relations}: </span>
                      {tbl.relations.join("; ")}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </LayerCard>
        </div>

        {/* 04 Workflow */}
        <LayerCard n="04" title={t.workflow}>
          <ol className="space-y-3">
            {bp.workflow.map((w) => (
              <li key={w.order} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink font-mono text-xs text-paper">
                  {w.order}
                </span>
                <div>
                  <div className="font-medium text-ink">{w.title}</div>
                  <div className="text-sm text-ink-muted">{w.detail}</div>
                </div>
              </li>
            ))}
          </ol>
        </LayerCard>

        {/* 06 Acceptance */}
        <LayerCard n="06" title={t.acceptance}>
          <ul className="space-y-2">
            {bp.acceptanceCriteria.map((a, i) => (
              <li key={i} className="flex gap-2 text-sm text-ink-soft">
                <span className="mt-0.5 text-lime-500">✓</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </LayerCard>

        {/* Gaps */}
        <div className="lg:col-span-2">
          <section className="card animate-rise border-masa-200 bg-masa-50 p-6">
            <h3 className="mb-3 font-display text-lg font-semibold text-ink">{t.gaps}</h3>
            {bp.readiness.gaps.length === 0 ? (
              <p className="text-sm text-ink-soft">{t.noGaps}</p>
            ) : (
              <ul className="grid gap-2 sm:grid-cols-2">
                {bp.readiness.gaps.map((g, i) => (
                  <li key={i} className="flex gap-2 text-sm text-ink-soft">
                    <span className="text-chili-500">!</span>
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        {/* 08 Build prompt (full width) */}
        <div className="lg:col-span-2">
          <section className="card animate-rise overflow-hidden">
            <div className="flex items-center justify-between border-b border-paper-line bg-ink px-6 py-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-masa-200">08</span>
                <h3 className="font-display text-lg font-semibold text-paper">{t.buildPrompt}</h3>
              </div>
              <button onClick={copyPrompt} className="rounded-full bg-masa-300 px-4 py-1.5 text-sm font-semibold text-ink transition-colors hover:bg-masa-200">
                {copied ? t.copied : t.copy}
              </button>
            </div>
            <pre className="scroll-thin max-h-[28rem] overflow-auto bg-ink-soft px-6 py-5 font-mono text-xs leading-relaxed text-paper/90">
{bp.buildPrompt}
            </pre>
          </section>
        </div>
      </div>
    </div>
  );
}
