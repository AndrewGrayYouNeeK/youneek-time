function getUtcOffsetLabel(now) {
  const offsetMinutes = -now.getTimezoneOffset();
  const sign = offsetMinutes >= 0 ? '+' : '-';
  const absoluteMinutes = Math.abs(offsetMinutes);
  const hours = Math.floor(absoluteMinutes / 60);
  const minutes = absoluteMinutes % 60;

  return `UTC${sign}${hours}${minutes ? `:${String(minutes).padStart(2, '0')}` : ''}`;
}

export default function ClockHeader({ now }) {
  const standardTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(now);

  return (
    <div className="text-center">
      <p className="font-mono text-2xl uppercase tracking-[0.45em] text-emerald-300 drop-shadow-[0_0_14px_rgba(110,255,178,0.85)] sm:text-3xl">YouNeeK Time</p>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-red-300/80">Pit by Andrew Gray</p>
      <p className="mt-2 font-mono text-xs uppercase tracking-[0.25em] text-white/34">Base-10 daily clock</p>
      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">Regular time • {standardTime} {getUtcOffsetLabel(now)}</p>
    </div>
  );
}