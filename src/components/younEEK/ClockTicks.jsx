const OUTER_TICKS = Array.from({ length: 24 }, (_, index) => {
  const angle = (index / 24) * Math.PI * 2 - Math.PI / 2;
  const isMajor = index % 3 === 0;
  const innerRadius = isMajor ? 160 : 171;
  const outerRadius = 182;

  return {
    x1: 200 + Math.cos(angle) * innerRadius,
    y1: 200 + Math.sin(angle) * innerRadius,
    x2: 200 + Math.cos(angle) * outerRadius,
    y2: 200 + Math.sin(angle) * outerRadius,
    strokeWidth: isMajor ? 2.2 : 1.1,
    opacity: isMajor ? 0.95 : 0.78,
    key: `outer-${index}`
  };
});

const INNER_TICKS = Array.from({ length: 100 }, (_, index) => {
  const angle = (index / 100) * Math.PI * 2 - Math.PI / 2;
  const isMajor = index % 10 === 0;
  const innerRadius = 144;
  const outerRadius = isMajor ? 156 : 151;

  return {
    x1: 200 + Math.cos(angle) * innerRadius,
    y1: 200 + Math.sin(angle) * innerRadius,
    x2: 200 + Math.cos(angle) * outerRadius,
    y2: 200 + Math.sin(angle) * outerRadius,
    strokeWidth: isMajor ? 1.5 : 0.8,
    opacity: isMajor ? 0.92 : 0.48,
    key: `inner-${index}`
  };
});

export default function ClockTicks() {
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
      {OUTER_TICKS.map((tick) => (
        <line
          key={tick.key}
          x1={tick.x1}
          y1={tick.y1}
          x2={tick.x2}
          y2={tick.y2}
          stroke={`rgba(110,255,178,${tick.opacity})`}
          strokeWidth={tick.strokeWidth}
          strokeLinecap="round"
        />
      ))}

      {INNER_TICKS.map((tick) => (
        <line
          key={tick.key}
          x1={tick.x1}
          y1={tick.y1}
          x2={tick.x2}
          y2={tick.y2}
          stroke={`rgba(255,92,92,${tick.opacity})`}
          strokeWidth={tick.strokeWidth}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}