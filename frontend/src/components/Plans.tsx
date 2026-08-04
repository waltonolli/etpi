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
    <section id="planos" className="py-16 bg-white/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink mb-3">
            A ETPI Acompanha a Evolução da Gestão de Pessoas na sua Empresa
          </h2>
          <p className="text-ink-soft">
            Cada plano foi desenvolvido para atender diferentes níveis de maturidade da gestão, desde a contratação até a construção de uma cultura baseada no potencial natural.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 ">
          {planos.map((plano) => (
            <div
              key={plano.id}
              className={`rounded-2xl p-6 border flex flex-col justify-between ${
                plano.destaque
                  ? "border-gold bg-ink text-parchment shadow-lg"
                  : "border-ink/10 bg-parchment"
              }`}
            >
              <div>
                <h3 className="font-display text-xl font-medium mb-2">{plano.nome}</h3>
                <p className={`text-sm mb-8 ${plano.destaque ? "text-parchment/70" : "text-ink-soft"}`}>
                  {plano.publico}
                </p>
              </div>
              <button
                onClick={() => onSelectPlan(plano.nome)}
                className={`w-full rounded-full py-2.5 text-sm font-semibold transition-colors cursor-pointer ${
                  plano.destaque
                    ? "bg-gold text-ink hover:bg-parchment"
                    : "bg-ink text-parchment hover:bg-rust"
                }`}
              >
                Falar sobre este plano
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
