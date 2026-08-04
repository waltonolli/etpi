export default function Footer() {
  return (
    <footer className="bg-ink text-parchment/70 py-6">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2 md:gap-4 text-sm">
        <span className="font-display text-parchment">ETPI - Inteligência para Gestão de Pessoas</span>
        <div className="flex gap-6 md:gap-0 md:flex-col">
          <a href="mailto:contato@etpi.app.br" className="hover:text-parchment transition-colors">
            contato@etpi.app.br
          </a>
          <a href="tel:+554730000000" className="hover:text-parchment transition-colors">
            (47) 93385-2600
          </a>
        </div>
        <span className="text-end">© {new Date().getFullYear()} ETPI. Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}
