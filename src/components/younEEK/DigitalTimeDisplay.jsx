const GREEN = '#39ff14';

function pad(value) {
  return String(value).padStart(2, '0');
}

function DigitCard({ digit }) {
  return (
    <div className="flex h-24 w-[4.8rem] items-center justify-center rounded-2xl border bg-black sm:h-28 sm:w-[5.4rem]"
      style={{
        borderColor: `${GREEN}44`,
        boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.03), 0 0 24px ${GREEN}33`,
      }}>
      <span className="font-mono text-6xl font-semibold tracking-[0.08em] sm:text-7xl"
        style={{ color: GREEN, textShadow: `0 0 18px ${GREEN}cc` }}>
        {digit}
      </span>
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
        <div className="px-1 font-mono text-5xl sm:text-6xl"
          style={{ color: GREEN, textShadow: `0 0 10px ${GREEN}` }}>•</div>
        <DigitCard digit={digits[2]} />
        <DigitCard digit={digits[3]} />
      </div>
      {/* Removed "Hours / 100" label per request */}
    </div>
  );
}
