export default function ClockHands({ unitRotation, minuteRotation, secondRotation, compact = false }) {
  const unitHandClass = compact
    ? 'absolute left-1/2 top-[24%] h-[28%] w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-cyan-100 via-cyan-200 to-cyan-400/30 shadow-[0_0_18px_rgba(165,243,252,0.95)]'
    : 'absolute left-1/2 top-[18%] h-[34%] w-[4px] -translate-x-1/2 rounded-full bg-gradient-to-b from-cyan-100 via-cyan-200 to-cyan-400/30 shadow-[0_0_24px_rgba(165,243,252,0.95)]';

  const minuteHandClass = compact
    ? 'absolute left-1/2 top-[20%] h-[32%] w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-white via-cyan-100 to-transparent shadow-[0_0_14px_rgba(255,255,255,0.75)]'
    : 'absolute left-1/2 top-[14%] h-[38%] w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-white via-cyan-100 to-transparent shadow-[0_0_18px_rgba(255,255,255,0.75)]';

  const secondHandClass = compact
    ? 'absolute left-1/2 top-[18%] h-[35%] w-[1.5px] -translate-x-1/2 rounded-full bg-gradient-to-b from-pink-200 via-pink-300 to-pink-500/40 shadow-[0_0_16px_rgba(249,168,212,0.95)]'
    : 'absolute left-1/2 top-[12%] h-[41%] w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-pink-200 via-pink-300 to-pink-500/40 shadow-[0_0_20px_rgba(249,168,212,0.95)]';

  const secondTailClass = compact
    ? 'absolute left-1/2 top-1/2 h-[10%] w-[1px] -translate-x-1/2 rounded-full bg-pink-200/70 shadow-[0_0_10px_rgba(249,168,212,0.8)]'
    : 'absolute left-1/2 top-1/2 h-[13%] w-[1px] -translate-x-1/2 rounded-full bg-pink-200/70 shadow-[0_0_12px_rgba(249,168,212,0.8)]';

  return (
    <>
      <div className="absolute inset-0" style={{ transform: `rotate(${unitRotation}deg)` }}>
        <div className={unitHandClass} />
      </div>

      <div className="absolute inset-0" style={{ transform: `rotate(${minuteRotation}deg)` }}>
        <div className={minuteHandClass} />
      </div>

      <div className="absolute inset-0" style={{ transform: `rotate(${secondRotation}deg)` }}>
        <div className={secondHandClass} />
        <div className={secondTailClass} />
      </div>
    </>
  );
}