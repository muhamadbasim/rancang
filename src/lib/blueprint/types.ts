// Core domain types for a generated blueprint.
// A blueprint is the structured, executable plan produced from a plain-language idea.

export type Lang = "id" | "en";

export interface UserRole {
  name: string;
  permissions: string[];
}

export interface SchemaColumn {
  name: string;
  type: string;
  note?: string;
}

export interface SchemaTable {
  name: string;
  columns: SchemaColumn[];
  relations: string[];
}

export interface WorkflowStep {
  order: number;
  title: string;
  detail: string;
}

export interface Integration {
  name: string;
  purpose: string;
  category: "payment" | "messaging" | "email" | "auth" | "storage" | "analytics" | "other";
}

export interface RoiEstimate {
  hoursSavedPerBlueprint: number;
  speedupFactor: number;
  revisionReductionPct: number;
  rationale: string;
}

export interface ReadinessFactor {
  label: string;
  score: number; // 0..100
  weight: number; // 0..1
  hint: string;
}

export interface Readiness {
  score: number; // 0..100 weighted
  factors: ReadinessFactor[];
  gaps: string[];
}

export interface Blueprint {
  id: string;
  createdAt: string;
  lang: Lang;
  idea: string;
  productName: string;
  // 8 layers
  productSummary: string;
  roles: UserRole[];
  schema: SchemaTable[];
  workflow: WorkflowStep[];
  integrations: Integration[];
  acceptanceCriteria: string[];
  roi: RoiEstimate;
  buildPrompt: string;
  // meta
  readiness: Readiness;
  domain: DomainKey;
  source: "heuristic" | "llm";
}

export type DomainKey =
  | "crm"
  | "booking"
  | "inventory"
  | "helpdesk"
  | "marketplace"
  | "generic";

export interface GenerateRequest {
  idea: string;
  lang?: Lang;
}
