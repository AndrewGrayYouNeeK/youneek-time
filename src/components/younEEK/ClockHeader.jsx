function getUtcOffsetLabel(now) {
  const offsetMinutes = -now.getTimezoneOffset();
  const sign = offsetMinutes >= 0 ? '+' : '-';
  const abs = Math.abs(offsetMinutes);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  return `UTC${sign}${h}${m ? `:${String(m).padStart(2, '0')}` : ''}`;
}

function pad(v) { return String(v).padStart(2, '0'); }

export default function ClockHeader({ now, time }) {
  // Regular 12-hour time
  const standardTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(now);

  // YouNeeK Army Time: 24h real hours, 100-minute hours, 100-second minutes
  const armyStr = `${pad(time.armyHours)}:${pad(time.armyMinutes)}:${pad(time.armySeconds)}`;

  // YouNeeK 12h Army Time: same but 12h format
  const army12Str = `${pad(time.hours12)}:${pad(time.armyMinutes)}:${pad(time.armySeconds)} ${time.ampm}`;

  return (
    <div className="header relative">
      <svg className="lightning-bg" viewBox="0 0 1200 200" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feFlood floodColor="#fff" floodOpacity="0.4"/>
            <feComposite in2="blur" operator="in"/>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <path className="bolt" d="M300 50 L320 80 L290 120 L310 160 L280 190" filter="url(#glow)"/>
        <path className="bolt" d="M600 30 L620 70 L590 110 L620 150 L580 180" filter="url(#glow)"/>
        <path className="bolt" d="M900 60 L920 90 L890 130 L920 170 L880 200" filter="url(#glow)"/>
      </svg>
      <div className="text-center relative z-10">
      <p className="font-mono text-5xl sm:text-6xl uppercase tracking-[0.45em] text-black font-bold animate-lightning">YouNeeK Time</p>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[#ff2222]" style={{textShadow:'0 0 8px #ff222299'}}>by Andrew Gray</p>


      {/* Time displays — evenly spaced with intentional fade */}
      <div className="mt-12 space-y-1">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/30">
          Regular time • {standardTime.replace(' AM', '').replace(' PM', '')}
        </p>

        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#39ff14]/50" style={{textShadow:'0 0 6px #39ff1433'}}>
          YouNeeK Time • {army12Str.replace(' PM', '').replace(' AM', '')}
        </p>

        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#39ff14]" style={{textShadow:'0 0 8px #39ff14aa'}}>
          YouNeeK Time • {armyStr}
        </p>
      </div>
      </div>
    </div>
  );
}