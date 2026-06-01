import type { Blueprint } from "./types";

// Renders the final "build prompt" — the payload a user copies and pastes into
// their AI builder (Trae, Cursor, etc.) to actually generate the application.

export function renderBuildPrompt(bp: Omit<Blueprint, "buildPrompt">): string {
  const roles = bp.roles
    .map((r) => `- ${r.name}: ${r.permissions.join(", ")}`)
    .join("\n");

  const schema = bp.schema
    .map((t) => {
      const cols = t.columns
        .map((c) => `    - ${c.name} ${c.type}${c.note ? ` (${c.note})` : ""}`)
        .join("\n");
      const rel = t.relations.length ? `\n    relations: ${t.relations.join("; ")}` : "";
      return `  ${t.name}:\n${cols}${rel}`;
    })
    .join("\n");

  const workflow = bp.workflow
    .map((w) => `${w.order}. ${w.title} — ${w.detail}`)
    .join("\n");

  const integrations = bp.integrations
    .map((i) => `- ${i.name} (${i.category}): ${i.purpose}`)
    .join("\n");

  const acceptance = bp.acceptanceCriteria.map((a) => `- ${a}`).join("\n");

  return `You are building a production-ready web application. Use Next.js (App Router) + TypeScript, PostgreSQL with Drizzle ORM, Tailwind CSS, and shadcn/ui. Implement authentication, validation, and proper error handling.

PRODUCT
${bp.productName} — ${bp.productSummary}

USER ROLES & PERMISSIONS
${roles}

DATABASE SCHEMA (PostgreSQL / Drizzle)
${schema}

WORKFLOW LOGIC
${workflow}

INTEGRATIONS
${integrations}

ACCEPTANCE CRITERIA (definition of done)
${acceptance}

REQUIREMENTS
- Generate Drizzle schema and migrations for every table above.
- Implement role-based access control matching the permissions list.
- Build the UI screens needed to complete each workflow step end to end.
- Add seed data so the app is demonstrable immediately.
- Include input validation and clear error states on every form.

Build the complete application now.`;
}
