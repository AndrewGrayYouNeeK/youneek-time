function pad(value) {
  return String(value).padStart(2, '0');
}

export default function DayProgressBar({ time }) {
  return (
    <div className="w-full">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(134,239,172,0.8)]"
          style={{ width: `${time.progress * 100}%` }}
        />
      </div>

      <div className="mt-3 flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-white/35">
        <span>{time.dayPercent}% of day</span>
        <span>U{pad(time.units)} M{pad(time.minutes)} S{pad(time.seconds)}</span>
      </div>
    </div>
  );
}