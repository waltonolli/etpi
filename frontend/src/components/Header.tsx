import Logo from "../assets/logo.svg";

interface HeaderProps {
  onCtaClick: () => void;
}

export default function Header({ onCtaClick }: HeaderProps) {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-parchment/90 backdrop-blur-sm border-b border-ink/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#top" className="flex items-center">
          <img src={Logo} alt="ETPI" className="h-7 w-auto" />
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-ink-soft">
          <a href="#metodo" className="hover:text-ink transition-colors">Método</a>
          <a href="#como-funciona" className="hover:text-ink transition-colors">Como funciona</a>
          <a href="#planos" className="hover:text-ink transition-colors">Planos</a>
        </nav>
        <button
          onClick={onCtaClick}
          className="rounded-full bg-ink text-parchment px-5 py-2.5 text-sm font-semibold hover:bg-rust cursor-pointer transition-colors"
        >
          Solicitar demonstração
        </button>
      </div>
    </header>
  );
}
