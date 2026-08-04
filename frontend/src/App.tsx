import { useRef, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Benefits from "./components/Benefits";
import HowItWorks from "./components/HowItWorks";
import Plans from "./components/Plans";
import CtaSection from "./components/CtaSection";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Path from "./components/Path";

export default function App() {
  const [planoSelecionado, setPlanoSelecionado] = useState<string | undefined>();
  const ctaRef = useRef<HTMLDivElement>(null);

  function scrollToCta(plano?: string) {
    if (plano) setPlanoSelecionado(plano);
    ctaRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="min-h-screen">
      <Header onCtaClick={() => scrollToCta()} />
      <main>
        <Hero onCtaClick={() => scrollToCta()} />
        <Benefits />
        <HowItWorks />
        <Path />
        <Plans onSelectPlan={(plano) => scrollToCta(plano)} />
        <CtaSection ref={ctaRef} planoSelecionado={planoSelecionado} />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
