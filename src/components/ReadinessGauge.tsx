interface Props {
  score: number;
  label: string;
}

export function ReadinessGauge({ score, label }: Props) {
  const r = 34;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const tone =
    score >= 75 ? "#3f7d20" : score >= 50 ? "#df9a22" : "#c73e1d";

  return (
    <div className="flex items-center gap-4">
      <div className="relative h-24 w-24 shrink-0">
        <svg viewBox="0 0 80 80" className="h-24 w-24 -rotate-90">
          <circle cx="40" cy="40" r={r} fill="none" stroke="#e7e2d9" strokeWidth="8" />
          <circle
            cx="40"
            cy="40"
            r={r}
            fill="none"
            stroke={tone}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 900ms var(--ease-out)" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-2xl font-semibold text-ink">{score}</span>
        </div>
      </div>
      <div>
        <div className="eyebrow">{label}</div>
        <div className="mt-1 max-w-[14rem] text-sm text-ink-muted">
          {score >= 75
            ? "Strong — ready to hand to a builder."
            : score >= 50
            ? "Decent — a few clarifications would help."
            : "Sketchy — add detail before building."}
        </div>
      </div>
    </div>
  );
}
