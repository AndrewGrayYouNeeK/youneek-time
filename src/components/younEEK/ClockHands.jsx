export default function ClockHands({ unitRotation, minuteRotation, secondRotation }) {
  return (
    <>
      <div className="absolute inset-0" style={{ transform: `rotate(${minuteRotation}deg)` }}>
        <div className="absolute left-1/2 top-[13%] h-[37%] w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-red-200 via-red-400 to-transparent shadow-[0_0_22px_rgba(255,92,92,0.95)]" />
      </div>

      <div className="absolute inset-0" style={{ transform: `rotate(${unitRotation}deg)` }}>
        <div className="absolute left-1/2 top-[21%] h-[29%] w-[2.5px] -translate-x-1/2 rounded-full bg-gradient-to-b from-emerald-100 via-emerald-300 to-transparent shadow-[0_0_28px_rgba(110,255,178,1)]" />
      </div>

      <div className="absolute inset-0 opacity-90" style={{ transform: `rotate(${secondRotation}deg)` }}>
        <div className="absolute left-1/2 top-[27%] h-[23%] w-[1.5px] -translate-x-1/2 rounded-full bg-gradient-to-b from-red-100 via-red-300 to-transparent shadow-[0_0_18px_rgba(255,138,138,0.85)]" />
      </div>

      <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-200 bg-[#080808] shadow-[0_0_18px_rgba(110,255,178,0.75),0_0_10px_rgba(255,92,92,0.35)]" />
      <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,255,178,0.95)]" />
    </>
  );
}