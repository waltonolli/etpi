import RadarMark from "./RadarMark";

interface HeroProps {
  onCtaClick: () => void;
}

export default function Hero({ onCtaClick }: HeroProps) {
  return (
    <section id="top" className="relative overflow-hidden pt-20 pb-10 ">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
        <div className="relative z-10">
          <span className="pt-7 mb:pt-0 inline-block font-mono text-xs tracking-widest uppercase text-rust mb-5">
            25 anos de metodologia científica
          </span>
          <h1 className="font-display text-4xl md:text-3xl lg:text-[2.4rem] leading-[1.08] font-semibold text-ink text-balance">
            Coloque cada pessoa na{" "}
            <span className="italic text-gold">função</span>{" "}
            em que seu{" "}
            <span className="italic text-gold">potencial natural</span>{" "}
            gera mais resultados.
          </h1>
          <p className="mt-6 text-base text-ink-soft max-w-lg leading-relaxed md:text-sm">
            A ETPI identifica o{" "}
            <span className="font-bold">potencial inato</span>{" "}
            das pessoas para apoiar decisões mais inteligentes sobre contratação, desenvolvimento, retenção e desempenho nas empresas.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button
              onClick={onCtaClick}
              className="rounded-full bg-gold text-ink px-7 py-3.5 font-semibold text-sm hover:bg-ink hover:text-parchment transition-colors cursor-pointer"
            >
              Solicitar demonstração
            </button>
            <a
              href="#como-funciona"
              className="text-sm font-semibold text-ink-soft hover:text-ink underline underline-offset-4"
            >
              Ver como funciona
            </a>
          </div>
        </div>

        <div className="relative justify-center items-center hidden md:flex">
          <div className="w-full max-w-md aspect-square flex items-center justify-center p-2">
            <RadarMark className="w-full h-full" />
          </div>
          <div className="absolute bottom-6 left-30 lg:left-50 -translate-x-16 lg:-translate-x-26 bg-white/90 backdrop-blur px-5 py-3 rounded-xl shadow-sm border border-ink/5">
            <p className="font-mono text-[10px] lg:text-xs text-ink-soft">Pessoas certas. Funções certas. Resultados melhores.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
