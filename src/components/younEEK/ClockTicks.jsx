// 12 green major ticks (hour positions)
const MAJOR_TICKS = Array.from({ length: 12 }, (_, index) => {
  const angle = (index / 12) * Math.PI * 2 - Math.PI / 2;
  const innerRadius = 176;
  const outerRadius = 190;

  return {
    x1: 200 + Math.cos(angle) * innerRadius,
    y1: 200 + Math.sin(angle) * innerRadius,
    x2: 200 + Math.cos(angle) * outerRadius,
    y2: 200 + Math.sin(angle) * outerRadius,
    strokeWidth: 1.4,
    stroke: '#10b981',
    opacity: 0.9,
    key: `major-${index}`
  };
});

// 60 red minor ticks (minute positions)
const MINOR_TICKS = Array.from({ length: 60 }, (_, index) => {
  const angle = (index / 60) * Math.PI * 2 - Math.PI / 2;
  const innerRadius = 182;
  const outerRadius = 190;

  return {
    x1: 200 + Math.cos(angle) * innerRadius,
    y1: 200 + Math.sin(angle) * innerRadius,
    x2: 200 + Math.cos(angle) * outerRadius,
    y2: 200 + Math.sin(angle) * outerRadius,
    strokeWidth: 0.7,
    stroke: '#ef4444',
    opacity: 0.7,
    key: `minor-${index}`
  };
});

const OUTER_TICKS = [...MAJOR_TICKS, ...MINOR_TICKS];

const INNER_TICKS = Array.from({ length: 100 }, (_, index) => {
  const angle = (index / 100) * Math.PI * 2 - Math.PI / 2;
  const isMajor = index % 10 === 0;
  const innerRadius = 132;
  const outerRadius = isMajor ? 149 : 145;

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
          stroke={tick.stroke}
          strokeWidth={tick.strokeWidth}
          opacity={tick.opacity}
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