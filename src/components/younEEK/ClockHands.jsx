export default function ClockHands({ unitRotation, minuteRotation, secondRotation }) {
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
      {/* Minute hand - red, stops before outer ticks */}
      <line
        x1="200" y1="200"
        x2={200 + Math.sin(minuteRotation * Math.PI / 180) * 172}
        y2={200 - Math.cos(minuteRotation * Math.PI / 180) * 172}
        stroke="#ff4444" strokeWidth="3" strokeLinecap="round"
      />
      {/* Hour hand - green, stops before outer ticks */}
      <line
        x1="200" y1="200"
        x2={200 + Math.sin(unitRotation * Math.PI / 180) * 155}
        y2={200 - Math.cos(unitRotation * Math.PI / 180) * 155}
        stroke="#00ff88" strokeWidth="3" strokeLinecap="round"
      />
      {/* Second hand - neon orange/yellow */}
      <line
        x1="200" y1="200"
        x2={200 + Math.sin(secondRotation * Math.PI / 180) * 168}
        y2={200 - Math.cos(secondRotation * Math.PI / 180) * 168}
        stroke="url(#secondGradient)" strokeWidth="2" strokeLinecap="round"
      />
      <defs>
        <linearGradient id="secondGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ff8800" />
          <stop offset="100%" stopColor="#ffff00" />
        </linearGradient>
      </defs>
      {/* Single center dot */}
      <circle cx="200" cy="200" r="5" fill="#00ff88" />
    </svg>
  );
}