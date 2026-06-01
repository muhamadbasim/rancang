import type { Lang } from "./blueprint/types";

export type { Lang };

export interface Dict {
  nav: { howItWorks: string; blueprint: string; faq: string; signIn: string; signUp: string };
  hero: {
    badge: string;
    titleA: string;
    titleB: string;
    subtitle: string;
    placeholder: string;
    cta: string;
    cooking: string;
    tryLabel: string;
    examples: string[];
    stats: { value: string; label: string }[];
    worksWith: string;
  };
  how: {
    eyebrow: string;
    title: string;
    steps: { n: string; title: string; body: string }[];
  };
  layers: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: { n: string; title: string; body: string }[];
  };
  why: {
    eyebrow: string;
    title: string;
    without: string;
    with: string;
    withoutItems: string[];
    withItems: string[];
  };
  faq: { eyebrow: string; title: string; items: { q: string; a: string }[] };
  result: {
    title: string;
    readiness: string;
    summary: string;
    roles: string;
    schema: string;
    workflow: string;
    integrations: string;
    acceptance: string;
    roi: string;
    buildPrompt: string;
    copy: string;
    copied: string;
    gaps: string;
    noGaps: string;
    back: string;
    hoursSaved: string;
    faster: string;
    revision: string;
    permissions: string;
    columns: string;
    relations: string;
  };
  footer: { tagline: string; product: string; resources: string; account: string };
  common: { idea: string; loading: string; error: string; lang: string };
}

export const DICT: Record<Lang, Dict> = {
  en: {
    nav: { howItWorks: "How it works", blueprint: "The blueprint", faq: "FAQ", signIn: "Sign in", signUp: "Sign up free" },
    hero: {
      badge: "PLANNING LAYER FOR AI BUILDERS",
      titleA: "Your app idea,",
      titleB: "planned in minutes.",
      subtitle:
        "Type your app idea in plain language. Get back a structured blueprint — schema, workflow, integrations, and a build prompt ready to paste into your AI builder. Your engineers build, not sit in clarification meetings.",
      placeholder:
        "Lean CRM for small agencies — manage leads, deal stages, follow-ups, monthly revenue forecast.",
      cta: "Cook the blueprint",
      cooking: "Cooking your blueprint…",
      tryLabel: "Try:",
      examples: [
        "Lean CRM for small agencies — manage leads, deal stages, follow-ups, revenue forecast",
        "Clinic doctor booking with QRIS payment and reminders",
        "Convenience-store inventory dashboard — real-time stock and low-stock alerts",
        "Multi-channel helpdesk — email + chat in one ticket inbox",
        "Marketplace MVP for handmade sellers with commission payouts",
      ],
      stats: [
        { value: "4.3h", label: "saved per blueprint" },
        { value: "3.2×", label: "faster to first build" },
        { value: "88%", label: "average readiness" },
      ],
      worksWith: "WORKS WITH",
    },
    how: {
      eyebrow: "HOW IT WORKS",
      title: "From messy idea to build-ready in 3 steps.",
      steps: [
        { n: "01", title: "Describe in plain language", body: "Write your app idea like you're explaining it to a colleague. Indonesian or English — the planner understands both." },
        { n: "02", title: "The planner structures it", body: "It drafts the product summary, user roles, database schema, workflow, integrations, acceptance criteria, ROI estimate, and a readiness score." },
        { n: "03", title: "Copy the build prompt", body: "One click copies the structured build prompt. Paste it into your AI builder and let it generate the application." },
      ],
    },
    layers: {
      eyebrow: "THE BLUEPRINT",
      title: "Every blueprint covers 8 layers of thinking.",
      subtitle: "Not a one-paragraph summary. It's structure your builder can act on immediately — each section written to be directly executable.",
      items: [
        { n: "01", title: "Product summary", body: "One paragraph that frames the product." },
        { n: "02", title: "User roles", body: "Who uses it, with which permissions." },
        { n: "03", title: "Database schema", body: "Tables, columns, relations — ready to migrate." },
        { n: "04", title: "Workflow logic", body: "Step-by-step business rules." },
        { n: "05", title: "Integration plan", body: "Third-party: payment, email, WhatsApp, etc." },
        { n: "06", title: "Acceptance criteria", body: "Definition of done — testable." },
        { n: "07", title: "ROI estimate", body: "Rough estimate of time and revisions saved." },
        { n: "08", title: "Build prompt", body: "Final payload to paste into your AI builder." },
      ],
    },
    why: {
      eyebrow: "WHY A PLANNING LAYER",
      title: "AI builders ship great apps. When fed great specs.",
      without: "WITHOUT A PLAN",
      with: "WITH A BLUEPRINT",
      withoutItems: [
        "Ideas re-explained 3–5 times to the AI.",
        "The builder makes something close — but not right.",
        "Every revision triggers a rebuild from scratch.",
        "Schema, workflow, and integrations figured out mid-build.",
        "Founders waste hours acting as full-time spec writers.",
      ],
      withItems: [
        "Idea written once; the planner does the structuring.",
        "The builder receives a precise, complete build prompt.",
        "Schema, workflow, integrations clear on day zero.",
        "Readiness score surfaces what still needs clarification.",
        "Founders focus on validation, not spec writing.",
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Questions that always come up.",
      items: [
        { q: "Does this replace my AI builder?", a: "No. It's a planning layer that sits in front of your builder. It writes the spec; your builder writes the code." },
        { q: "Can it be used standalone?", a: "Yes. The blueprint is a complete, structured document you can hand to any engineer or AI tool — or read yourself." },
        { q: "Which languages are supported?", a: "Indonesian and English. Describe your idea in either; the planner detects the domain and structures it." },
        { q: "Does it need an API key or internet?", a: "No. The default engine is fully offline and deterministic. You can optionally plug in an LLM for richer phrasing." },
        { q: "Is my idea data safe?", a: "Blueprints are generated on your own server. Nothing is sent to a third party unless you explicitly enable an LLM provider." },
      ],
    },
    result: {
      title: "Your blueprint",
      readiness: "Readiness",
      summary: "Product summary",
      roles: "User roles",
      schema: "Database schema",
      workflow: "Workflow logic",
      integrations: "Integration plan",
      acceptance: "Acceptance criteria",
      roi: "ROI estimate",
      buildPrompt: "Build prompt",
      copy: "Copy build prompt",
      copied: "Copied!",
      gaps: "What still needs clarification",
      noGaps: "This idea is well-specified. Nothing critical is missing.",
      back: "← Plan another idea",
      hoursSaved: "hours saved",
      faster: "× faster to build",
      revision: "% fewer revisions",
      permissions: "Permissions",
      columns: "Columns",
      relations: "Relations",
    },
    footer: { tagline: "The planning layer for AI builders.", product: "PRODUCT", resources: "RESOURCES", account: "ACCOUNT" },
    common: { idea: "App idea", loading: "Loading", error: "Something went wrong. Try again.", lang: "EN" },
  },

  id: {
    nav: { howItWorks: "Cara kerja", blueprint: "Blueprint", faq: "FAQ", signIn: "Masuk", signUp: "Daftar gratis" },
    hero: {
      badge: "LAPISAN PERENCANAAN UNTUK AI BUILDER",
      titleA: "Ide aplikasimu,",
      titleB: "terencana dalam menit.",
      subtitle:
        "Tulis ide aplikasimu dengan bahasa sehari-hari. Dapatkan blueprint terstruktur — skema, alur kerja, integrasi, dan build prompt yang siap ditempel ke AI builder-mu. Engineer-mu membangun, bukan rapat klarifikasi.",
      placeholder:
        "CRM ringan untuk agensi kecil — kelola leads, tahapan deal, follow-up, perkiraan pendapatan bulanan.",
      cta: "Masak blueprint",
      cooking: "Memasak blueprint-mu…",
      tryLabel: "Coba:",
      examples: [
        "CRM ringan untuk agensi kecil — kelola leads, tahapan deal, follow-up, perkiraan pendapatan",
        "Booking dokter klinik dengan pembayaran QRIS dan pengingat",
        "Dashboard inventaris toko kelontong — stok real-time dan peringatan stok menipis",
        "Helpdesk multi-channel — email + chat dalam satu kotak tiket",
        "MVP marketplace untuk penjual handmade dengan bagi hasil komisi",
      ],
      stats: [
        { value: "4.3 jam", label: "hemat per blueprint" },
        { value: "3.2×", label: "lebih cepat ke build pertama" },
        { value: "88%", label: "rata-rata kesiapan" },
      ],
      worksWith: "BEKERJA DENGAN",
    },
    how: {
      eyebrow: "CARA KERJA",
      title: "Dari ide berantakan ke siap-build dalam 3 langkah.",
      steps: [
        { n: "01", title: "Jelaskan dengan bahasa biasa", body: "Tulis ide aplikasimu seperti menjelaskan ke rekan kerja. Bahasa Indonesia atau Inggris — keduanya dipahami." },
        { n: "02", title: "Perencana menyusunnya", body: "Disusun ringkasan produk, peran pengguna, skema database, alur kerja, integrasi, kriteria penerimaan, estimasi ROI, dan skor kesiapan." },
        { n: "03", title: "Salin build prompt", body: "Satu klik menyalin build prompt terstruktur. Tempel ke AI builder-mu dan biarkan ia membangun aplikasi." },
      ],
    },
    layers: {
      eyebrow: "BLUEPRINT",
      title: "Setiap blueprint mencakup 8 lapisan pemikiran.",
      subtitle: "Bukan ringkasan satu paragraf. Ini struktur yang langsung bisa dieksekusi builder-mu — tiap bagian ditulis agar siap dijalankan.",
      items: [
        { n: "01", title: "Ringkasan produk", body: "Satu paragraf yang membingkai produk." },
        { n: "02", title: "Peran pengguna", body: "Siapa memakainya, dengan izin apa." },
        { n: "03", title: "Skema database", body: "Tabel, kolom, relasi — siap migrasi." },
        { n: "04", title: "Logika alur kerja", body: "Aturan bisnis langkah demi langkah." },
        { n: "05", title: "Rencana integrasi", body: "Pihak ketiga: pembayaran, email, WhatsApp, dll." },
        { n: "06", title: "Kriteria penerimaan", body: "Definisi selesai — bisa diuji." },
        { n: "07", title: "Estimasi ROI", body: "Perkiraan kasar waktu dan revisi yang dihemat." },
        { n: "08", title: "Build prompt", body: "Payload akhir untuk ditempel ke AI builder." },
      ],
    },
    why: {
      eyebrow: "KENAPA LAPISAN PERENCANAAN",
      title: "AI builder bikin aplikasi hebat. Kalau diberi spec hebat.",
      without: "TANPA RENCANA",
      with: "DENGAN BLUEPRINT",
      withoutItems: [
        "Ide dijelaskan ulang 3–5 kali ke AI.",
        "Builder bikin sesuatu yang mirip — tapi belum tepat.",
        "Setiap revisi memicu build ulang dari nol.",
        "Skema, alur, integrasi baru kepikiran saat implementasi.",
        "Founder buang waktu jadi penulis spec penuh waktu.",
      ],
      withItems: [
        "Ide ditulis sekali; perencana yang menyusun.",
        "Builder menerima build prompt yang tepat dan lengkap.",
        "Skema, alur, integrasi jelas di hari nol.",
        "Skor kesiapan menyoroti yang masih perlu diperjelas.",
        "Founder fokus ke validasi, bukan menulis spec.",
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Pertanyaan yang selalu muncul.",
      items: [
        { q: "Apakah ini menggantikan AI builder saya?", a: "Tidak. Ini lapisan perencanaan di depan builder-mu. Ia menulis spec; builder-mu menulis kodenya." },
        { q: "Bisa dipakai mandiri?", a: "Bisa. Blueprint adalah dokumen lengkap dan terstruktur yang bisa diserahkan ke engineer atau tool AI mana pun — atau kamu baca sendiri." },
        { q: "Bahasa apa yang didukung?", a: "Indonesia dan Inggris. Jelaskan idemu dalam salah satunya; perencana mendeteksi domain dan menyusunnya." },
        { q: "Perlu API key atau internet?", a: "Tidak. Mesin bawaan sepenuhnya offline dan deterministik. Kamu bisa opsional menyambungkan LLM untuk frasa yang lebih kaya." },
        { q: "Apakah data ide saya aman?", a: "Blueprint dibuat di server-mu sendiri. Tidak ada yang dikirim ke pihak ketiga kecuali kamu mengaktifkan penyedia LLM." },
      ],
    },
    result: {
      title: "Blueprint-mu",
      readiness: "Kesiapan",
      summary: "Ringkasan produk",
      roles: "Peran pengguna",
      schema: "Skema database",
      workflow: "Logika alur kerja",
      integrations: "Rencana integrasi",
      acceptance: "Kriteria penerimaan",
      roi: "Estimasi ROI",
      buildPrompt: "Build prompt",
      copy: "Salin build prompt",
      copied: "Tersalin!",
      gaps: "Yang masih perlu diperjelas",
      noGaps: "Ide ini sudah cukup spesifik. Tidak ada yang kritikal terlewat.",
      back: "← Rencanakan ide lain",
      hoursSaved: "jam dihemat",
      faster: "× lebih cepat dibangun",
      revision: "% lebih sedikit revisi",
      permissions: "Izin",
      columns: "Kolom",
      relations: "Relasi",
    },
    footer: { tagline: "Lapisan perencanaan untuk AI builder.", product: "PRODUK", resources: "SUMBER", account: "AKUN" },
    common: { idea: "Ide aplikasi", loading: "Memuat", error: "Terjadi kesalahan. Coba lagi.", lang: "ID" },
  },
};
