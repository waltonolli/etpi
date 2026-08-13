interface CompassMarkProps {
  className?: string;
  variant?: "full" | "mark";
}

/**
 * Elemento visual de assinatura da marca: uma agulha de bússola que
 * atravessa camadas — do comportamento observável, na superfície,
 * até o núcleo, onde está o potencial inato — e se fixa exatamente
 * na camada certa para cada pessoa. Reaparece, em escala menor, como
 * marcador de lista ao longo do site.
 */
export default function CompassMark({ className = "", variant = "full" }: CompassMarkProps) {
  if (variant === "mark") {
    return (
      <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
        <line
          x1="7" y1="27" x2="33" y2="27"
          stroke="#C68A3D" strokeWidth="1.4" strokeDasharray="1.5 3.5" opacity="0.55"
        />
        <g transform="rotate(-8 20 19)">
          <polygon points="20,5 24,19 20,19 16,19" fill="#16213A" />
          <polygon points="20,19 24,19 20,33 16,19" fill="#C68A3D" />
        </g>
        <circle cx="20" cy="19" r="2.4" fill="#16213A" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 480 480" className={className} aria-hidden="true">
      <g opacity="0.9">
        {/* Camadas: da superfície (comportamento observável) ao núcleo (potencial inato) */}
        <line x1="55" y1="128" x2="425" y2="128" stroke="#2F6F62" strokeWidth="1.6" strokeDasharray="1 9" opacity="0.35" />
        <line x1="95" y1="196" x2="385" y2="196" stroke="#C68A3D" strokeWidth="1.6" strokeDasharray="1 9" opacity="0.45" />
        <line x1="140" y1="264" x2="340" y2="264" stroke="#2F6F62" strokeWidth="1.8" strokeDasharray="2 7" opacity="0.55" />
        <line x1="188" y1="332" x2="292" y2="332" stroke="#C68A3D" strokeWidth="2.2" opacity="0.8" />

        {/* Agulha de bússola: atravessa as camadas até encontrar o núcleo */}
        <g transform="rotate(-8 240 232)">
          <polygon points="240,128 250,232 240,232 230,232" fill="#16213A" />
          <polygon points="240,232 250,232 240,336 230,232" fill="#C68A3D" />
        </g>

        {/* Pivô */}
        <circle cx="240" cy="232" r="7" fill="#16213A" />
        <circle cx="240" cy="232" r="14" fill="none" stroke="#16213A" strokeWidth="1.2" opacity="0.35" />
      </g>
    </svg>
  );
}
