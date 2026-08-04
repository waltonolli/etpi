const etapas = [
  {
    numero: "01",
    titulo: "Identificação da Inteligência Natural",
    texto: "Base Ativa, Emocional ou Racional.",
  },
  {
    numero: "02",
    titulo: "Relação entre pessoa e função",
    texto: "A análise considera o potencial natural e a realidade da função.",
  },
  {
    numero: "03",
    titulo: "Entregamos inteligência para a decisão",
    texto: "Muito além de um relatório. Você recebe informações para contratar, desenvolver e reter melhor.",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="pt-8 font-display text-3xl md:text-4xl font-semibold text-ink mb-4">
          Como a ETPI Identifica o Potencial Natural
        </h2>
        <p className="mb-10 max-w-lg font-light">Em poucos minutos, nossa metodologia transforma informações em decisões mais inteligentes para sua empresa.</p>
        <div className="grid md:grid-cols-3 gap-10">
          {etapas.map((etapa) => (
            <div key={etapa.numero} className="border-t-2 border-gold pt-5">
              <span className="font-mono text-sm text-rust">{etapa.numero}</span>
              <h3 className="font-display text-xl font-medium text-ink mt-2 mb-2">{etapa.titulo}</h3>
              <p className="text-ink-soft leading-relaxed">{etapa.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
