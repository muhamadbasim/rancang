import { NextResponse } from "next/server";
import { generateBlueprint } from "@/lib/blueprint";
import type { Lang } from "@/lib/blueprint/types";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: { idea?: unknown; lang?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const idea = typeof body.idea === "string" ? body.idea.trim() : "";
  const lang: Lang = body.lang === "id" ? "id" : "en";

  if (idea.length < 8) {
    return NextResponse.json(
      { error: "Please describe your idea in at least a short sentence." },
      { status: 422 }
    );
  }
  if (idea.length > 1200) {
    return NextResponse.json(
      { error: "Idea is too long. Keep it under 1200 characters." },
      { status: 422 }
    );
  }

  const blueprint = generateBlueprint(idea, lang);
  return NextResponse.json({ blueprint });
}
