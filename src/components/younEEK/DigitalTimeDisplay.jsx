function pad(value) {
  return String(value).padStart(2, '0');
}

function DigitCard({ digit }) {
  return (
    <div className="flex h-20 w-[4.2rem] items-center justify-center rounded-2xl border border-white/10 bg-[#111111] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)] sm:h-24 sm:w-[4.8rem]">
      <span className="font-mono text-5xl font-semibold tracking-[0.08em] text-emerald-300 sm:text-6xl">{digit}</span>
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
        <div className="px-1 font-mono text-4xl text-emerald-300 sm:text-5xl">•</div>
        <DigitCard digit={digits[2]} />
        <DigitCard digit={digits[3]} />
      </div>
      <p className="mt-4 font-mono text-xs uppercase tracking-[0.35em] text-white/35">Units / 100</p>
    </div>
  );
}