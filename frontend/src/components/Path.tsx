interface IconeProps {
  className?: string;
}

/* ── Ícones da jornada ──────────────────────────────────────────────
   Glifos de linha, 24×24, herdando currentColor — mesma linguagem
   gráfica do RadarMark. Substituem emojis, que renderizam de forma
   inconsistente entre sistemas e não aceitam a cor do tema.
   ──────────────────────────────────────────────────────────────── */

function IconeSelecionar({ className = "" }: IconeProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c0-3.9 3.1-6 7-6s7 2.1 7 6" />
    </svg>
  );
}

function IconeContratar({ className = "" }: IconeProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8.5 13.2l2.5 2.5 5-5" />
    </svg>
  );
}

function IconeIntegrar({ className = "" }: IconeProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 6.5v3M10 13.6l-3 2M14 13.6l3 2" />
      <circle cx="12" cy="12" r="2.5" />
      <circle cx="12" cy="4.5" r="2" />
      <circle cx="5.5" cy="17.5" r="2" />
      <circle cx="18.5" cy="17.5" r="2" />
    </svg>
  );
}

function IconeDesenvolver({ className = "" }: IconeProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 17.5l5-5 3.5 3.5L20 8.5" />
      <path d="M15 8.5h5v5" />
    </svg>
  );
}

function IconeReter({ className = "" }: IconeProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20s-7-4.4-7-9.3A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7 2.7c0 4.9-7 9.3-7 9.3z" />
    </svg>
  );
}

function IconeLiderar({ className = "" }: IconeProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="8" r="3" />
      <path d="M3 19c0-3.3 2.7-5 6-5s6 1.7 6 5" />
      <circle cx="17.5" cy="9" r="2.4" />
      <path d="M16 14.4c3 .2 5 2 5 4.6" />
    </svg>
  );
}

/* ── Dados ─────────────────────────────────────────────────────── */

const etapas = [
  { titulo: "Selecionar", Icone: IconeSelecionar },
  { titulo: "Contratar", Icone: IconeContratar },
  { titulo: "Integrar", Icone: IconeIntegrar },
  { titulo: "Desenvolver", Icone: IconeDesenvolver },
  { titulo: "Reter", Icone: IconeReter },
  { titulo: "Liderar", Icone: IconeLiderar },
];

/**
 * `cobertura` = até qual etapa da jornada o plano vai (1 a 6).
 * É o único número que controla o comprimento da barra — ajuste aqui
 * se a cobertura comercial de algum plano for diferente.
 */
const planos = [
  { nome: "Essência", cobertura: 2 },
  { nome: "Evolução", cobertura: 3 },
  { nome: "Estratégico", cobertura: 5 },
  { nome: "Integrador", cobertura: 6 },
];

/* Grade de 12 meias-colunas: o ponto da etapa N cai na linha (2N-1),
   então uma barra que cobre até a etapa N vai da linha 2 até a 2N.
   É isso que faz a barra terminar exatamente sobre o ponto da trilha. */
function spanDaBarra(cobertura: number) {
  return { gridColumn: `2 / ${2 * cobertura}` };
}

export default function Path() {
  return (
    <section id="jornada" className="bg-ink text-parchment py-10 mb:py-20">
      <div className="px-8 max-w-4xl mx-auto mb-6">
        <h2 className="mb-2 mb:mb-8 font-display text-2xl md:text-4xl font-semibold text-gold-soft text-balance">
          Uma metodologia para toda a jornada do colaborador
        </h2>
        <p className="font-body text-lg font-light text-parchment/60 text-balance">
          Da seleção ao desenvolvimento das lideranças.
        </p>
      </div>
      <div className="max-w-4xl mx-auto px-6">
        {/* Painel de contorno: título, jornada e cobertura moram na MESMA
            grade, então a coluna 2 é literalmente a mesma para todos. */}
        <div className="rounded-2xl pl-7 pr-6 py-10 md:px-12 md:py-14 bg-white/[0.05]border border-x-white/10 border-b-white/10 border-t-white/25 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.55),inset_0_1px_0_rgb(255_255_255/0.1)]">
          <div className="md:grid md:grid-cols-[13rem_1fr] md:gap-x-2">
            {/* ── Cabeçalho ────────────────────────────────────────── */}


            {/* ── Jornada: horizontal no desktop ───────────────────── */}
            <div className="md:block md:col-start-2">
              <div className="grid grid-cols-6">
                {etapas.map(({ titulo, Icone }) => (
                  <div key={titulo} className="flex justify-center">
                    <Icone className="w-6 h-6 text-gold-soft" />
                  </div>
                ))}
              </div>

              <div className="relative mt-3 lg:my-4">
                <div className="absolute left-[8.333%] right-[8.333%] top-1/2 h-px -translate-y-1/2 bg-parchment/20" />
                <div className="relative grid grid-cols-6 py-1 ">
                  {etapas.map(({ titulo }) => (
                    <div key={titulo} className="flex justify-center">
                      <span className="w-2 h-2 rounded-full bg-gold" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Etiquetas retas — lg pra cima */}
              <div className="hidden lg:grid grid-cols-6">
                {etapas.map(({ titulo }) => (
                  <p key={titulo} className="text-center font-mono text-[11px] uppercase tracking-wider text-parchment/80">
                    {titulo}
                  </p>
                ))}
              </div>

              {/* Etiquetas inclinadas — abaixo de lg */}
              <div className="grid grid-cols-6 h-20 lg:hidden">
                {etapas.map(({ titulo }) => (
                  <div key={titulo} className="relative">
                    <span className="absolute left-6 -translate-x-full origin-top-right -rotate-55 whitespace-nowrap font-mono text-[10px] uppercase tracking-wider text-parchment/80">
                      {titulo}
                    </span>
                  </div>
                ))}
              </div>
            </div>


            {/* ── Cobertura dos planos ─────────────────────────────── */}
            <p className="font-mono text-[11px] uppercase tracking-widest text-parchment/40 lg:mt-4 mb-4 md:col-span-2">
              Cobertura por plano
            </p>

            {planos.map(({ nome, cobertura }) => (
              <div key={nome} className="group contents">
                <div className="md:col-start-1 mb-2 md:mb-6 md:self-center">
                  <h3 className="font-display text-lg font-medium leading-tight">{nome}</h3>
                  <p className="font-mono text-[11px] text-parchment/50 mt-0.5">
                    {etapas[0].titulo} → {etapas[cobertura - 1].titulo}
                  </p>
                </div>

                <div className="md:col-start- mb-8 md:mb-6 md:self-center grid grid-cols-12 items-center">
                  <div className="row-start-1 col-start-2 col-end-12 h-2.5 rounded-full bg-parchment/10" />
                  <div
                    className="row-start-1 h-2.5 rounded-full bg-gold opacity-90 transition-opacity group-hover:opacity-100"
                    style={spanDaBarra(cobertura)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
