import type { Readiness, ReadinessFactor } from "./types";
import type { ClassifyResult } from "./domains";

// Computes a readiness score that surfaces what an idea still needs to clarify
// before it is safe to hand to a builder. Mirrors the "readiness score" concept
// from the reference product.

interface ReadinessInput {
  idea: string;
  classify: ClassifyResult;
}

const MONETIZATION_HINTS = [
  "pay", "payment", "bayar", "pricing", "price", "harga", "subscription", "langganan",
  "commission", "komisi", "revenue", "qris", "invoice",
];

const ROLE_HINTS = [
  "admin", "user", "customer", "pelanggan", "staff", "seller", "buyer", "agent",
  "agen", "manager", "owner", "team", "tim", "role", "peran",
];

const INTEGRATION_HINTS = [
  "email", "whatsapp", "wa", "sms", "calendar", "kalender", "payment", "stripe",
  "midtrans", "qris", "api", "integration", "integrasi", "notification", "notifikasi",
];

function detail(idea: string, hints: string[]): number {
  const text = idea.toLowerCase();
  const hit = hints.some((h) => text.includes(h));
  return hit ? 100 : 0;
}

export function computeReadiness({ idea, classify }: ReadinessInput): Readiness {
  const words = idea.trim().split(/\s+/).filter(Boolean).length;

  // Clarity: longer, descriptive ideas score higher (saturating around 35 words).
  const clarity = Math.min(100, Math.round((words / 35) * 100));

  // Domain fit: how confidently we classified the idea.
  const domainFit = Math.round(classify.confidence * 100);

  const factors: ReadinessFactor[] = [
    {
      label: "Clarity of description",
      score: clarity,
      weight: 0.3,
      hint: "Describe the idea in 1-3 full sentences with concrete features.",
    },
    {
      label: "Domain fit",
      score: domainFit,
      weight: 0.25,
      hint: "Name the kind of app (CRM, booking, inventory, helpdesk, marketplace…).",
    },
    {
      label: "Roles defined",
      score: detail(idea, ROLE_HINTS),
      weight: 0.15,
      hint: "Mention who uses it (admin, staff, customer, etc.).",
    },
    {
      label: "Monetization / value",
      score: detail(idea, MONETIZATION_HINTS),
      weight: 0.15,
      hint: "Note if there is payment, pricing, or a revenue goal.",
    },
    {
      label: "Integrations",
      score: detail(idea, INTEGRATION_HINTS),
      weight: 0.15,
      hint: "Mention third-party needs (email, WhatsApp, payment, calendar).",
    },
  ];

  const score = Math.round(
    factors.reduce((sum, f) => sum + f.score * f.weight, 0)
  );

  const gaps = factors
    .filter((f) => f.score < 60)
    .map((f) => f.hint);

  return { score, factors, gaps };
}
