function getUtcOffsetLabel(now) {
  const offsetMinutes = -now.getTimezoneOffset();
  const sign = offsetMinutes >= 0 ? '+' : '-';
  const absoluteMinutes = Math.abs(offsetMinutes);
  const hours = Math.floor(absoluteMinutes / 60);
  const minutes = absoluteMinutes % 60;

  return `UTC${sign}${hours}${minutes ? `:${String(minutes).padStart(2, '0')}` : ''}`;
}

export default function ClockHeader({ now, time }) {
  const standardTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(now);

  const armyHours = String(now.getHours()).padStart(2, '0');
  const armyMinutes = String(time.minutes).padStart(2, '0');
  const armySeconds = String(time.seconds).padStart(2, '0');

  return (
    <div className="text-center">
      <p className="font-mono text-2xl uppercase tracking-[0.45em] text-emerald-300 sm:text-3xl">YouNeeK Time</p>
      <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-red-200">by Andrew Gray</p>
      
      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/75">Regular time • {standardTime} {getUtcOffsetLabel(now)}</p>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-200">YouNeek army time • {armyHours}:{armyMinutes}:{armySeconds}</p>
    </div>);

}