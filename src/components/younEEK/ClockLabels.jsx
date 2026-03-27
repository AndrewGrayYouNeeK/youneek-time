const polarPoint = (radius, angleDeg) => {
  const angle = (angleDeg - 90) * (Math.PI / 180);
  return {
    x: 200 + Math.cos(angle) * radius,
    y: 200 + Math.sin(angle) * radius
  };
};

const outerLabels = [
  { label: '0', angle: 0, color: 'rgba(248,113,113,1)', size: 18, offsetY: 8 },
  { label: '03', angle: 45, color: 'rgba(134,239,172,1)', size: 15 },
  { label: '06', angle: 90, color: 'rgba(134,239,172,1)', size: 15 },
  { label: '09', angle: 135, color: 'rgba(134,239,172,1)', size: 15 },
  { label: '12', angle: 180, color: 'rgba(134,239,172,1)', size: 15 },
  { label: '15', angle: 225, color: 'rgba(134,239,172,1)', size: 15 },
  { label: '18', angle: 270, color: 'rgba(134,239,172,1)', size: 15 },
  { label: '21', angle: 315, color: 'rgba(134,239,172,1)', size: 15 }
];

const innerLabels = [
  { label: '10', angle: 36 },
  { label: '20', angle: 72 },
  { label: '30', angle: 108 },
  { label: '40', angle: 144 },
  { label: '50', angle: 180 },
  { label: '60', angle: 216 },
  { label: '70', angle: 252 },
  { label: '80', angle: 288 },
  { label: '90', angle: 324 }
];

export default function ClockLabels() {
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
      <text x="200" y="212" textAnchor="middle" fill="rgba(255,255,255,0.04)" fontSize="28" fontFamily="monospace" letterSpacing="4">
        YOUNEEK
      </text>

      {outerLabels.map((item) => {
        const point = polarPoint(140, item.angle);
        return (
          <text
            key={item.label}
            x={point.x}
            y={point.y + (item.offsetY || 0)}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={item.color}
            fontSize={item.size}
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
            fill="rgba(248,113,113,0.95)"
            fontSize="10"
            fontFamily="monospace"
            fontWeight="700"
          >
            {item.label}
          </text>
        );
      })}
    </svg>
  );
}