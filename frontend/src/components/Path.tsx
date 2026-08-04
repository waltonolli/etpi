import RadarMark from "./RadarMark";

const jornada = [
  {
    titulo: "Selecionar",
    imagem: "",
  },
    {
    titulo: "Contratar",
    imagem: "",
  },
    {
    titulo: "Integrar",
    imagem: "",
  },
    {
    titulo: "Desenvolver",
    imagem: "",
  },
    {
    titulo: "Reter",
    imagem: "",
  },
    {
    titulo: "Promover",
    imagem: "",
  },
];

const planos = [
  {
    plano: "Selecionar",
  },
]

export default function Path() {
  return (
    <section id="jornada" className="bg-ink text-parchment py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl lg:max-w-3xl mb-14">
          <h2 className="font-display text-3xl text-gold-soft md:text-3xl">
            O método ETPI acompanha toda a jornada do colaborador
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-10">
          {jornada.map((b) => (
            <div key={b.titulo} className="flex gap-4">
              <div>
                <h3 className="font-display text-lg font-medium mb-1.5">{b.titulo}</h3>
              </div>
              <RadarMark variant="mark" className="w-10 h-10 shrink-0 mt-1" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
