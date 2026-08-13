import { type ElementType, type ReactNode } from "react";
import { useInView } from "../hooks/useInView";

interface RevealProps {
  children: ReactNode;
  /** Atraso em ms, para escalonar itens de uma lista (stagger). */
  delay?: number;
  /** Elemento HTML a renderizar (padrão: div). */
  as?: ElementType;
  className?: string;
}

/**
 * Envolve qualquer conteúdo e o revela com um fade + leve deslocamento
 * vertical quando entra no viewport. Respeita prefers-reduced-motion
 * via CSS (ver index.css).
 */
export default function Reveal({ children, delay = 0, as: Tag = "div", className = "" }: RevealProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      className={`reveal ${isInView ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: isInView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Tag>
  );
}
