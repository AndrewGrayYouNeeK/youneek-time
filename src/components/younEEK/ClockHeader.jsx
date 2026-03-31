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
            <feFlood floodColor="#fff" floodOpacity="0.5"/>
            <feComposite in2="blur" operator="in"/>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {/* Left bolt with branches */}
        <path className="bolt bolt-1" d="M200 20 L210 50 L195 85 L205 120 L190 150 L200 180 L185 200" filter="url(#glow)"/>
        <path className="bolt bolt-1 branch" d="M210 50 L230 70 L215 95" filter="url(#glow)"/>
        <path className="bolt bolt-1 branch" d="M195 85 L175 100 L170 125" filter="url(#glow)"/>
        <path className="bolt bolt-1 branch" d="M190 150 L170 165 L175 185" filter="url(#glow)"/>
        
        {/* Center bolt with branches */}
        <path className="bolt bolt-2" d="M550 10 L560 45 L545 80 L558 120 L540 155 L552 190 L535 200" filter="url(#glow)"/>
        <path className="bolt bolt-2 branch" d="M560 45 L580 65 L575 90" filter="url(#glow)"/>
        <path className="bolt bolt-2 branch" d="M545 80 L525 105 L530 140" filter="url(#glow)"/>
        <path className="bolt bolt-2 branch" d="M540 155 L520 170 L525 190" filter="url(#glow)"/>
        
        {/* Right bolt with branches */}
        <path className="bolt bolt-3" d="M950 30 L960 60 L945 100 L958 140 L940 170 L952 195 L935 200" filter="url(#glow)"/>
        <path className="bolt bolt-3 branch" d="M960 60 L985 80 L975 110" filter="url(#glow)"/>
        <path className="bolt bolt-3 branch" d="M945 100 L920 125 L925 155" filter="url(#glow)"/>
        <path className="bolt bolt-3 branch" d="M940 170 L915 185 L920 200" filter="url(#glow)"/>
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