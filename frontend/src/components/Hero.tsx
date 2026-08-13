import CompassMark from "./CompassMark";

interface HeroProps {
  onCtaClick: () => void;
}

export default function Hero({ onCtaClick }: HeroProps) {
  return (
    <section id="top" className="relative overflow-hidden pt-section-lg pb-section-sm ">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
        <div className="relative z-10">
          <span
            className="hero-enter pt-7 md:pt-0 inline-block font-mono text-xs tracking-widest uppercase text-rust mb-5"
            style={{ animationDelay: "0ms" }}
          >
            25 anos de metodologia científica
          </span>
          <h1 className="hero-enter text-ink " style={{ animationDelay: "80ms" }}>
            Coloque cada pessoa na{" "}
            <span className="italic text-gold">função</span>{" "}
            em que seu{" "}
            <span className="italic text-gold">potencial natural</span>{" "}
            gera mais resultados.
          </h1>
          <p
            className="hero-enter mt-6 text-base text-ink-soft max-w-lg leading-relaxed md:text-sm"
            style={{ animationDelay: "180ms" }}
          >
            A ETPI identifica o{" "}
            <span className="font-bold">potencial inato</span>{" "}
            das pessoas para apoiar decisões mais inteligentes sobre contratação, desenvolvimento, retenção e desempenho nas empresas.
          </p>
          <div className="hero-enter mt-9 flex flex-wrap items-center gap-4" style={{ animationDelay: "280ms" }}>
            <button
              onClick={onCtaClick}
              className="rounded-full bg-gold text-ink px-7 py-3.5 font-semibold text-sm hover:bg-ink hover:text-parchment active:scale-95 transition-all cursor-pointer"
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

        <div className="hero-enter relative justify-center items-center hidden md:flex" style={{ animationDelay: "220ms" }}>
          <div className="w-full max-w-md aspect-square flex items-center justify-center p-2">
            <CompassMark className="w-full h-full" />
          </div>
          <div className="absolute bottom-6 left-30 lg:left-50 -translate-x-16 lg:-translate-x-26 bg-white/90 backdrop-blur px-5 py-3 rounded-xl shadow-sm border border-ink/5">
            <p className="font-mono text-[10px] lg:text-xs text-ink-soft">Pessoas certas. Funções certas. Resultados melhores.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
