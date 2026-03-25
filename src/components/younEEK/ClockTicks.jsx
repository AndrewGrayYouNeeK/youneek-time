const TICKS = Array.from({ length: 100 }, (_, index) => {
  const angle = (index / 100) * Math.PI * 2 - Math.PI / 2;
  const isMajor = index % 10 === 0;
  const isMedium = !isMajor && index % 5 === 0;
  const innerRadius = isMajor ? 160 : isMedium ? 167 : 173;
  const outerRadius = 186;

  return {
    x1: 200 + Math.cos(angle) * innerRadius,
    y1: 200 + Math.sin(angle) * innerRadius,
    x2: 200 + Math.cos(angle) * outerRadius,
    y2: 200 + Math.sin(angle) * outerRadius,
    glowWidth: isMajor ? 8 : isMedium ? 5 : 3,
    strokeWidth: isMajor ? 3 : isMedium ? 2 : 1.25,
    opacity: isMajor ? 0.95 : isMedium ? 0.62 : 0.28,
    key: `tick-${index}`
  };
});

export default function ClockTicks() {
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
      {TICKS.map((tick) => (
        <g key={tick.key}>
          <line
            x1={tick.x1}
            y1={tick.y1}
            x2={tick.x2}
            y2={tick.y2}
            stroke="rgba(125, 211, 252, 0.18)"
            strokeWidth={tick.glowWidth}
            strokeLinecap="round"
          />
          <line
            x1={tick.x1}
            y1={tick.y1}
            x2={tick.x2}
            y2={tick.y2}
            stroke={`rgba(255,255,255,${tick.opacity})`}
            strokeWidth={tick.strokeWidth}
            strokeLinecap="round"
          />
        </g>
      ))}
    </svg>
  );
}