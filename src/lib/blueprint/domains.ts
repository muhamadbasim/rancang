import type { DomainKey } from "./types";

// Lightweight keyword classifier. Works for both Indonesian and English idea text.
// Returns the best-matching domain plus a confidence (0..1) used for readiness scoring.

interface DomainSignature {
  key: DomainKey;
  keywords: string[];
}

const SIGNATURES: DomainSignature[] = [
  {
    key: "crm",
    keywords: [
      "crm", "lead", "leads", "prospek", "deal", "pipeline", "sales", "penjualan",
      "follow-up", "followup", "follow up", "tindak lanjut", "customer relationship",
      "agency", "agensi", "revenue forecast", "forecast", "kontak", "contact",
    ],
  },
  {
    key: "booking",
    keywords: [
      "booking", "book", "reservasi", "reservation", "appointment", "janji", "jadwal",
      "schedule", "clinic", "klinik", "doctor", "dokter", "salon", "barber", "qris",
      "slot", "calendar", "kalender", "antrian", "queue",
    ],
  },
  {
    key: "inventory",
    keywords: [
      "inventory", "inventaris", "stock", "stok", "warehouse", "gudang", "sku",
      "convenience store", "toko", "retail", "pos", "kasir", "supplier", "purchase order",
      "restock", "barang", "produk", "real-time",
    ],
  },
  {
    key: "helpdesk",
    keywords: [
      "helpdesk", "help desk", "support", "ticket", "tiket", "customer service",
      "cs", "complaint", "keluhan", "multi-channel", "omnichannel", "email", "chat",
      "sla", "agent", "agen", "inbox",
    ],
  },
  {
    key: "marketplace",
    keywords: [
      "marketplace", "pasar", "seller", "penjual", "buyer", "pembeli", "mvp",
      "handmade", "vendor", "listing", "katalog", "catalog", "checkout", "storefront",
      "commission", "komisi", "multi-vendor", "ecommerce", "e-commerce",
    ],
  },
];

export interface ClassifyResult {
  domain: DomainKey;
  confidence: number;
  matched: string[];
}

export function classifyIdea(idea: string): ClassifyResult {
  const text = ` ${idea.toLowerCase()} `;
  let best: { key: DomainKey; matched: string[] } = { key: "generic", matched: [] };
  let bestCount = 0;

  for (const sig of SIGNATURES) {
    const matched = sig.keywords.filter((kw) => text.includes(` ${kw} `) || text.includes(kw));
    if (matched.length > bestCount) {
      bestCount = matched.length;
      best = { key: sig.key, matched };
    }
  }

  // Confidence grows with number of distinct matches, capped at 1.
  const confidence = Math.min(1, bestCount / 4);
  return { domain: best.key, confidence, matched: best.matched };
}
