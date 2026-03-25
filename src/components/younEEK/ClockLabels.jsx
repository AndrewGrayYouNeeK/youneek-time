const polarPoint = (radius, angleDeg) => {
  const angle = (angleDeg - 90) * (Math.PI / 180);
  return {
    x: 200 + Math.cos(angle) * radius,
    y: 200 + Math.sin(angle) * radius
  };
};

const outerLabels = [
  { label: '03', angle: 50 },
  { label: '06', angle: 90 },
  { label: '09', angle: 130 },
  { label: '12', angle: 180 },
  { label: '15', angle: 230 },
  { label: '18', angle: 270 },
  { label: '21', angle: 310 }
];

const innerLabels = [
  { label: '10', angle: 38 },
  { label: '20', angle: 68 },
  { label: '30', angle: 112 },
  { label: '40', angle: 146 },
  { label: '50', angle: 180 },
  { label: '60', angle: 214 },
  { label: '70', angle: 248 },
  { label: '80', angle: 292 },
  { label: '90', angle: 322 }
];

export default function ClockLabels() {
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
      <text x="200" y="214" textAnchor="middle" fill="rgba(255,255,255,0.05)" fontSize="34" fontFamily="monospace" letterSpacing="4">
        YOUNEEK
      </text>

      {outerLabels.map((item) => {
        const point = polarPoint(152, item.angle);
        return (
          <text
            key={item.label}
            x={point.x}
            y={point.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="rgba(134,239,172,0.9)"
            fontSize="16"
            fontFamily="monospace"
            fontWeight="700"
          >
            {item.label}
          </text>
        );
      })}

      {innerLabels.map((item) => {
        const point = polarPoint(118, item.angle);
        return (
          <text
            key={item.label}
            x={point.x}
            y={point.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="rgba(248,113,113,0.75)"
            fontSize="11"
            fontFamily="monospace"
          >
            {item.label}
          </text>
        );
      })}
    </svg>
  );
}