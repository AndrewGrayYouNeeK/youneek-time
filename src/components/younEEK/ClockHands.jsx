export default function ClockHands({ unitRotation, minuteRotation, secondRotation }) {
  return (
    <>
      <div className="absolute inset-0" style={{ transform: `rotate(${minuteRotation}deg)` }}>
        <div className="absolute left-1/2 top-[13%] h-[37%] w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#ff1111] via-[#ff1111] to-transparent" />
      </div>

      <div className="absolute inset-0" style={{ transform: `rotate(${unitRotation}deg)` }}>
        <div className="absolute left-1/2 top-[1%] h-[45%] w-[2.5px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#00ff88] via-[#00ff88] to-transparent" />
      </div>

      <div className="absolute inset-0 opacity-90" style={{ transform: `rotate(${secondRotation}deg)` }}>
        <div className="absolute left-1/2 top-[27%] h-[23%] w-[1.5px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#00ff88] via-[#00ff88] to-transparent" />
      </div>

      <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00ff88] bg-[#080808] animate-pulse" />
      <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00ff88] animate-pulse" />
    </>
  );
}