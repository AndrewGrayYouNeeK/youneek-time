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
      <p className="font-mono text-xl uppercase tracking-[0.45em] text-emerald-300 sm:text-2xl">YouNeeK Time</p>
      <p className="mt-2 font-mono text-xs uppercase tracking-[0.25em] text-white/28">Base-10 daily clock</p>
      <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-white/38">• {standardTime} {getUtcOffsetLabel(now)}</p>
    </div>
  );
}