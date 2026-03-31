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
    <div className="text-center">
      <p className="font-mono text-2xl uppercase tracking-[0.45em] text-[#39ff14] sm:text-3xl" style={{textShadow:'0 0 12px #39ff14aa'}}>YouNeeK Time</p>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[#ff2222]" style={{textShadow:'0 0 8px #ff222299'}}>by Andrew Gray</p>


      <p className="mt-12 font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">
        Regular time • {standardTime.replace(' AM', '').replace(' PM', '')}
      </p>

      {/* YouNeeK Time */}
      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#39ff14]/55" style={{textShadow:'0 0 6px #39ff1433'}}>
        YouNeeK Time • {army12Str.replace(' PM', '').replace(' AM', '')}
      </p>

      {/* YouNeeK Time */}
      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[#39ff14]/75" style={{textShadow:'0 0 6px #39ff1455'}}>
        YouNeeK Time • {armyStr}
      </p>
    </div>
  );
}