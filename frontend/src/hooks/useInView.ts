import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  /** Fração do elemento visível para disparar (0–1). */
  threshold?: number;
  /** Antecipa/atrasa o disparo em relação às bordas do viewport. */
  rootMargin?: string;
  /** Se true (padrão), a animação dispara uma única vez. */
  triggerOnce?: boolean;
}

/**
 * Observa quando um elemento entra no viewport, para acionar
 * animações de "reveal" ao rolar a página. Usa IntersectionObserver
 * nativo — sem dependência externa.
 */
export function useInView<T extends HTMLElement>({
  threshold = 0.15,
  rootMargin = "0px 0px -60px 0px",
  triggerOnce = true,
}: UseInViewOptions = {}) {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Sem IntersectionObserver (browsers muito antigos): mostra direto.
    if (typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) observer.unobserve(node);
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isInView };
}
