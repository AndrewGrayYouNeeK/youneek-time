const OUTER_TICKS = Array.from({ length: 24 }, (_, index) => {
  const angle = (index / 24) * Math.PI * 2 - Math.PI / 2;
  const isMajor = index % 3 === 0;
  const outerRadius = 198;
  const innerRadius = isMajor ? 184 : 191;

  return {
    x1: 200 + Math.cos(angle) * outerRadius,
    y1: 200 + Math.sin(angle) * outerRadius,
    x2: 200 + Math.cos(angle) * innerRadius,
    y2: 200 + Math.sin(angle) * innerRadius,
    strokeWidth: isMajor ? 2.5 : 1,
    stroke: '#00ff88',
    key: `tick-${index}`
  };
});

const INNER_TICKS = Array.from({ length: 100 }, (_, index) => {
  const angle = (index / 100) * Math.PI * 2 - Math.PI / 2;
  const isMajor = index % 10 === 0;
  const innerRadius = 150;
  const outerRadius = isMajor ? 162 : 156;

  return {
    x1: 200 + Math.cos(angle) * innerRadius,
    y1: 200 + Math.sin(angle) * innerRadius,
    x2: 200 + Math.cos(angle) * outerRadius,
    y2: 200 + Math.sin(angle) * outerRadius,
    strokeWidth: isMajor ? 2.2 : 0.8,
    opacity: 1,
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
          stroke={tick.stroke}
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
          stroke="#ff0055"
          strokeWidth={tick.strokeWidth}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}