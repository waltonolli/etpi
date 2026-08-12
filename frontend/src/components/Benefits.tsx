import RadarMark from "./RadarMark";

const beneficios = [
  {
    titulo: "Contratações mais assertivas",
    texto: "Encontre pessoas naturalmente compatíveis com a função antes da contratação.",
  },
  {
    titulo: "Equipes mais engajadas",
    texto: "Compreenda o que motiva cada colaborador e reduza a rotatividade.",
  },
  {
    titulo: "Lideranças mais preparadas",
    texto: "Desenvolva líderes que entendem como extrair o melhor de cada perfil.",
  },
  {
    titulo: "Empresas mais produtivas",
    texto: "Menos conflitos, menos retrabalho e melhor aproveitamento dos talentos.",
  },
];

export default function Benefits() {
  return (
    <section id="metodo" className="bg-ink text-parchment py-section">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl lg:max-w-3xl mb-14 ">
          <h2 className="text-parchment">
            Quando cada pessoa ocupa a função compatível com seu potencial natural, toda a empresa evolui.
          </h2>
          <p className="pt-6 max-w-lg font-light">A ETPI ajuda líderes e empresas a tomar decisões mais inteligentes sobre pessoas, reduzindo erros e aumentando resultados.</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-10 lg:max-w-3xl lg:mx-auto">
          {beneficios.map((b) => (
            <div key={b.titulo} className="flex gap-4">
              <RadarMark variant="mark" className="w-10 h-10 shrink-0 mt-1" />
              <div>
                <h3 className="mb-1.5">{b.titulo}</h3>
                <p className="text-parchment/70 font-light leading-relaxed max-w-2xs">{b.texto}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
