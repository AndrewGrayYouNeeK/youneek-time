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
    <div className="storm-header">
      <svg className="lightning-layer" viewBox="0 0 1400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <filter id="lightning-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur1"/>
            <feGaussianBlur stdDeviation="12" result="blur2"/>
            <feMerge>
              <feMergeNode in="blur2"/>
              <feMergeNode in="blur1"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="afterglow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="soft"/>
          </filter>
        </defs>
        <path id="bolt1" className="bolt" d="M180 20 L220 90 L190 140 L240 180 L200 250 L230 290" filter="url(#lightning-glow)"/>
        <path id="bolt2" className="bolt" d="M520 10 L560 70 L510 110 L570 160 L530 200 L580 240 L540 280" filter="url(#lightning-glow)"/>
        <path id="bolt2-branch" className="bolt branch" d="M560 70 L590 40 L610 80" filter="url(#lightning-glow)"/>
        <path id="bolt3" className="bolt" d="M920 40 L960 100 L910 150 L970 190 L930 240 L980 270" filter="url(#lightning-glow)"/>
        <path id="bolt4" className="bolt distant" d="M1150 80 L1180 110 L1140 160 L1190 190" filter="url(#afterglow)"/>
      </svg>
      <h1 className="youneek-title">Youneek</h1>
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