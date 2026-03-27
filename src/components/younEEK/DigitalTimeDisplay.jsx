function pad(value) {
  return String(value).padStart(2, '0');
}

function DigitCard({ digit }) {
  return (
    <div className="flex h-24 w-[4.8rem] items-center justify-center rounded-2xl border border-emerald-200/15 bg-[#101010] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04),0_0_24px_rgba(74,222,128,0.08)] sm:h-28 sm:w-[5.4rem]">
      <span className="font-mono text-6xl font-semibold tracking-[0.08em] text-[#6EF695] sm:text-7xl">{digit}</span>
    </div>
  );
}

export default function DigitalTimeDisplay({ time }) {
  const digits = [...pad(time.units), ...pad(time.minutes)];

  return (
    <div className="w-full text-center">
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        <DigitCard digit={digits[0]} />
        <DigitCard digit={digits[1]} />
        <div className="px-1 font-mono text-5xl text-red-400 sm:text-6xl">•</div>
        <DigitCard digit={digits[2]} />
        <DigitCard digit={digits[3]} />
      </div>
      <p className="mt-4 font-mono text-xs uppercase tracking-[0.35em] text-white/70">Hours / 100</p>
    </div>
  );
}