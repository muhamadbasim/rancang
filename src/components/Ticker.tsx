const ITEMS = [
  "SINGLE-TENANT RUNTIME",
  "ID + EN BILINGUAL",
  "OFFLINE-FIRST ENGINE",
  "8-LAYER BLUEPRINTS",
  "READINESS SCORING",
  "ALL SYSTEMS OPERATIONAL",
];

export function Ticker() {
  const strip = [...ITEMS, ...ITEMS];
  return (
    <div className="overflow-hidden border-b border-paper-line bg-ink text-paper">
      <div className="flex w-max animate-marquee whitespace-nowrap py-2">
        {strip.map((item, i) => (
          <span key={i} className="flex items-center font-mono text-[11px] uppercase tracking-[0.2em]">
            <span className="px-5 text-masa-200">◆</span>
            <span className="text-paper/80">{item}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
