interface RadarMarkProps {
  className?: string;
  variant?: "full" | "mark";
}

/**
 * Elemento visual de assinatura da marca: arcos concêntricos pontilhados,
 * remetendo à ideia de um "mapa de potencial" único de cada pessoa —
 * como uma impressão digital comportamental. Reaparece, em escala menor,
 * como marcador de lista ao longo do site.
 */
export default function RadarMark({ className = "", variant = "full" }: RadarMarkProps) {
  if (variant === "mark") {
    return (
      <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
        <circle cx="20" cy="20" r="3" fill="#C68A3D" />
        <circle
          cx="20"
          cy="20"
          r="10"
          fill="none"
          stroke="#C68A3D"
          strokeWidth="1.5"
          strokeDasharray="2 4"
          opacity="0.6"
        />
        <circle
          cx="20"
          cy="20"
          r="17"
          fill="none"
          stroke="#2F6F62"
          strokeWidth="1.5"
          strokeDasharray="1 5"
          opacity="0.4"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 480 480" className={className} aria-hidden="true">
      <g opacity="0.9">
        {[60, 105, 150, 195].map((r, i) => (
          <circle
            key={r}
            cx="240"
            cy="240"
            r={r}
            fill="none"
            stroke={i % 2 === 0 ? "#C68A3D" : "#2F6F62"}
            strokeWidth="1.4"
            strokeDasharray={i % 2 === 0 ? "2 8" : "1 10"}
            opacity={0.75 - i * 0.12}
          />
        ))}
        {/* Pontos de dados distribuídos de forma assimétrica, como um perfil individual único */}
        {[
          [240, 44], [322, 62], [388, 114], [435, 225], [426, 300],
          [335, 355], [235, 390], [142, 355], [105, 305], [46, 230],
          [66, 153], [107, 98], [204, 94], [265, 138], [300, 250],
          [240, 345], [180, 238], [240, 180],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 4.5 : 2.5} fill="#C68A3D" opacity={0.85} />
        ))}
        <circle cx="240" cy="240" r="6" fill="#16213A" />
      </g>
    </svg>
  );
}
