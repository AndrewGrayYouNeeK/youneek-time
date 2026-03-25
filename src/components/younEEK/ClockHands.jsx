export default function ClockHands({ unitRotation, minuteRotation, secondRotation }) {
  return (
    <>
      <div className="absolute inset-0" style={{ transform: `rotate(${minuteRotation}deg)` }}>
        <div className="absolute left-1/2 top-[14%] h-[36%] w-[1.5px] -translate-x-1/2 rounded-full bg-gradient-to-b from-red-300 via-red-400 to-transparent shadow-[0_0_12px_rgba(248,113,113,0.65)]" />
      </div>

      <div className="absolute inset-0" style={{ transform: `rotate(${unitRotation}deg)` }}>
        <div className="absolute left-1/2 top-[22%] h-[28%] w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-emerald-200 via-emerald-300 to-transparent shadow-[0_0_18px_rgba(134,239,172,0.9)]" />
      </div>

      <div className="absolute inset-0 opacity-60" style={{ transform: `rotate(${secondRotation}deg)` }}>
        <div className="absolute left-1/2 top-[28%] h-[22%] w-px -translate-x-1/2 rounded-full bg-gradient-to-b from-emerald-100/70 to-transparent" />
      </div>

      <div className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300 bg-[#080808] shadow-[0_0_12px_rgba(134,239,172,0.55)]" />
      <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300" />
    </>
  );
}