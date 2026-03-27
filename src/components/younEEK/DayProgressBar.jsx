function pad(value) {
  return String(value).padStart(2, '0');
}

export default function DayProgressBar({ time }) {
  return (
    <div className="w-full">
      <div className="h-2 w-full overflow-hidden rounded-full border border-white/10 bg-[#0b0b0b] shadow-[inset_0_0_10px_rgba(255,255,255,0.03)]">
        <div
          className="h-full rounded-full bg-[#6EF695] shadow-[0_0_18px_rgba(110,255,178,1)]"
          style={{ width: `${time.progress * 100}%` }}
        />
      </div>

      <div className="mt-3 flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
        <span>{time.dayPercent}% of day</span>
        <span>H{pad(time.units)} M{pad(time.minutes)} S{pad(time.seconds)}</span>
      </div>
    </div>
  );
}