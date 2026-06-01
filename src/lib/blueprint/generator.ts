import { classifyIdea } from "./domains";
import { computeReadiness } from "./readiness";
import { renderBuildPrompt } from "./buildPrompt";
import { TEMPLATES } from "./templates";
import type { Blueprint, Lang, RoiEstimate } from "./types";

// Heuristic blueprint generator. Deterministic, offline, no API key required.
// This is the engine behind the demo; an LLM can be layered on top later
// (see llm.ts) but the product must work without one.

function id(): string {
  // Short, URL-safe-ish id without external deps.
  return (
    Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
  ).toLowerCase();
}

function titleCase(input: string): string {
  return input
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// Try to lift a product name from the idea ("CRM for agencies" -> "Lean CRM"),
// otherwise fall back to the domain default.
function deriveName(idea: string, fallback: string): string {
  const trimmed = idea.trim();
  // Grab the first meaningful noun-ish phrase before a dash or comma.
  const head = trimmed.split(/[—,\-.:]/)[0]?.trim() ?? "";
  if (head.length >= 3 && head.length <= 28) {
    return titleCase(head);
  }
  return fallback;
}

function buildSummary(idea: string, frame: string): string {
  const cleaned = idea.trim().replace(/\s+/g, " ");
  return `This product is ${frame}. It is derived from the stated idea: "${cleaned}". The application is single-tenant, role-aware, and built to be demonstrable from day one.`;
}

function estimateRoi(readiness: number, tableCount: number): RoiEstimate {
  // More structure resolved up front = more hours saved downstream.
  const hours = Math.round((tableCount * 0.9 + readiness / 30) * 10) / 10;
  const speedup = Math.round((2.4 + readiness / 100 + tableCount * 0.1) * 10) / 10;
  const revisionReduction = Math.min(80, 40 + Math.round(readiness / 3));
  return {
    hoursSavedPerBlueprint: hours,
    speedupFactor: speedup,
    revisionReductionPct: revisionReduction,
    rationale:
      "Estimated from the number of resolved schema tables and the readiness score. A clearer, more complete spec means fewer clarification loops and rebuilds.",
  };
}

export function generateBlueprint(rawIdea: string, lang: Lang = "en"): Blueprint {
  const idea = rawIdea.trim();
  const classify = classifyIdea(idea);
  const template = TEMPLATES[classify.domain];
  const readiness = computeReadiness({ idea, classify });

  const productName = deriveName(idea, template.defaultName);
  const productSummary = buildSummary(idea, template.summaryFrame);

  const partial: Omit<Blueprint, "buildPrompt"> = {
    id: id(),
    createdAt: new Date().toISOString(),
    lang,
    idea,
    productName,
    productSummary,
    roles: template.roles,
    schema: template.schema,
    workflow: template.workflow,
    integrations: template.integrations,
    acceptanceCriteria: template.acceptanceCriteria,
    roi: estimateRoi(readiness.score, template.schema.length),
    readiness,
    domain: classify.domain,
    source: "heuristic",
  };

  return {
    ...partial,
    buildPrompt: renderBuildPrompt(partial),
  };
}
