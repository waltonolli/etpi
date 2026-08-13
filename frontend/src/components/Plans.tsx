import Reveal from "./Reveal";

interface PlansProps {
  onSelectPlan: (plano: string) => void;
}

const planos = [
  {
    id: "essencia",
    nome: "Essência",
    publico: "Para empresas que querem contratar melhor.",
    destaque: false,
  },
  {
    id: "evolucao",
    nome: "Evolução",
    publico: "Para empresas que querem reduzir turnover e aumentar o engajamento.",
    destaque: true,
  },
  {
    id: "estrategico",
    nome: "Estratégico",
    publico: "Para empresas que desejam desenvolver pessoas e lideranças.",
    destaque: false,
  },
  {
    id: "integrador",
    nome: "Integrador",
    publico: "Para empresas que querem transformar sua cultura organizacional.",
    destaque: false,
  },
];

export default function Plans({ onSelectPlan }: PlansProps) {
  return (
    <section id="planos" className="py-section bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="max-w-3xl  mb-14">
          <h2 className="text-ink mb-3">
            A ETPI Acompanha a Evolução da Gestão de Pessoas na sua Empresa
          </h2>
          <p className="text-ink-soft">
            Cada plano foi desenvolvido para atender diferentes níveis de maturidade da gestão, desde a contratação até a construção de uma cultura baseada no potencial natural.
          </p>
        </Reveal>
        <div className="md:max-w-xl md:mx-auto lg:max-w-4xl grid grid-cols-2 lg:grid-cols-4 gap-5 ">
          {planos.map((plano, i) => (
            <Reveal key={plano.id} delay={i * 90}>
              <div
                className={`h-full rounded-2xl p-3 md:p-6 border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 ${
                  plano.destaque
                    ? "border-gold bg-ink text-parchment shadow-[0_2px_4px_rgb(0_0_0/0.10),0_24px_48px_-16px_rgb(0_0_0/0.45),inset_0_1px_0_rgb(255_255_255/0.12)]"
                    : "border-ink/10 bg-parchment shadow-[0_1px_2px_rgb(0_0_0/0.04),0_12px_28px_-14px_rgb(0_0_0/0.25)] hover:shadow-[0_2px_4px_rgb(0_0_0/0.06),0_20px_40px_-16px_rgb(0_0_0/0.30)]"
                }`}
              >
                <div>
                  <h3 className="mb-2">{plano.nome}</h3>
                  <p className={`text-xs md:text-sm mb-8 ${plano.destaque ? "text-parchment/70" : "text-ink-soft"}`}>
                    {plano.publico}
                  </p>
                </div>
                <button
                  onClick={() => onSelectPlan(plano.nome)}
                  className={`w-38 md:w-full rounded-full py-2.5 text-xs font-medium  md:font-semibold transition-all active:scale-95 cursor-pointer ${
                    plano.destaque
                      ? "bg-gold text-ink hover:bg-parchment"
                      : "bg-ink text-parchment hover:bg-rust"
                  }`}
                >
                  Falar sobre este plano
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
