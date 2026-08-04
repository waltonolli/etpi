import { forwardRef } from "react";
import LeadForm from "./LeadForm";

interface CtaSectionProps {
  planoSelecionado?: string;
}

const CtaSection = forwardRef<HTMLDivElement, CtaSectionProps>(({ planoSelecionado }, ref) => {
  return (
    <section id="contato" ref={ref} className="py-16">
      <div className="max-w-2xl mx-auto px-6">
        <div className="flex flex-col justify-center mb-10 text-center">
          <h2 className="pt-8 max-w-xl mx-auto font-display text-4xl font-semibold text-ink mb-3">
            Descubra Como a ETPI Pode Transformar a Gestão de Pessoas da sua Empresa
          </h2>
          <p className="text-ink-soft mx-auto max-w-lg">
            Agende uma demonstração e conheça a metodologia aplicada ao contexto da sua equipe.
          </p>
        </div>
        <div className="bg-parchment rounded-2xl border border-ink/10 p-6 md:p-8 shadow-sm">
          <LeadForm planoSelecionado={planoSelecionado} />
        </div>
      </div>
    </section>
  );
});

CtaSection.displayName = "CtaSection";

export default CtaSection;
