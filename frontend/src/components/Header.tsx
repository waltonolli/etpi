import { useEffect, useState } from "react";
import Logo from "../assets/logo.svg";

interface HeaderProps {
  onCtaClick: () => void;
}

const NAV_LINKS = [
  { href: "#metodo", label: "Método" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#planos", label: "Planos" },
];

export default function Header({ onCtaClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState<string>("");

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(
      (el): el is Element => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveHash(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`site-header fixed top-0 inset-x-0 z-40 bg-parchment/90 backdrop-blur-sm border-b border-ink/10 ${
        isScrolled ? "is-scrolled" : ""
      }`}
    >
      <div className={`max-w-6xl mx-auto px-6 flex items-center justify-between transition-[padding] duration-300 ${isScrolled ? "py-3" : "py-4"}`}>
        <a href="#top" className="flex items-center">
          <img src={Logo} alt="ETPI" className="h-7 w-auto" />
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-ink-soft">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link hover:text-ink transition-colors ${
                activeHash === link.href ? "is-active text-ink" : ""
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <button
          onClick={onCtaClick}
          className="rounded-full bg-ink text-parchment px-5 py-2.5 text-sm font-semibold hover:bg-rust active:scale-95 cursor-pointer transition-all"
        >
          Solicitar demonstração
        </button>
      </div>
    </header>
  );
}
