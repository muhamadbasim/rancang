"use client";

import { useEffect, useState } from "react";
import { DICT } from "@/lib/i18n";
import type { Lang } from "@/lib/blueprint/types";
import type { Blueprint } from "@/lib/blueprint/types";
import { Ticker } from "@/components/Ticker";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { HowItWorks, Layers, Why, Faq } from "@/components/Sections";
import { Footer } from "@/components/Footer";
import { BlueprintResult } from "@/components/BlueprintResult";

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [blueprint, setBlueprint] = useState<Blueprint | null>(null);
  const dict = DICT[lang];

  // Restore preferred language from previous visit.
  useEffect(() => {
    const saved = window.localStorage.getItem("rancang_lang");
    if (saved === "id" || saved === "en") setLang(saved);
  }, []);

  function toggleLang() {
    setLang((prev) => {
      const next = prev === "en" ? "id" : "en";
      window.localStorage.setItem("rancang_lang", next);
      return next;
    });
  }

  function handleResult(bp: Blueprint) {
    setBlueprint(bp);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div id="top">
      <Ticker />
      <Nav dict={dict} lang={lang} onToggleLang={toggleLang} />

      {blueprint ? (
        <main>
          <BlueprintResult blueprint={blueprint} dict={dict} onReset={() => setBlueprint(null)} />
        </main>
      ) : (
        <main>
          <Hero dict={dict} lang={lang} onResult={handleResult} />
          <HowItWorks dict={dict} />
          <Layers dict={dict} />
          <Why dict={dict} />
          <Faq dict={dict} />
        </main>
      )}

      <Footer dict={dict} />
    </div>
  );
}
