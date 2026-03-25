const SYNODIC_MONTH = 29.53058867;
const KNOWN_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14, 0);

function getMoonData(now) {
  const daysSinceNewMoon = (now.getTime() - KNOWN_NEW_MOON) / 86400000;
  const normalizedPhase = ((daysSinceNewMoon % SYNODIC_MONTH) + SYNODIC_MONTH) % SYNODIC_MONTH;
  const phaseFraction = normalizedPhase / SYNODIC_MONTH;
  const illumination = 0.5 * (1 - Math.cos(2 * Math.PI * phaseFraction));

  let name = 'New Moon';
  if (phaseFraction >= 0.03 && phaseFraction < 0.22) name = 'Waxing Crescent';
  else if (phaseFraction >= 0.22 && phaseFraction < 0.28) name = 'First Quarter';
  else if (phaseFraction >= 0.28 && phaseFraction < 0.47) name = 'Waxing Gibbous';
  else if (phaseFraction >= 0.47 && phaseFraction < 0.53) name = 'Full Moon';
  else if (phaseFraction >= 0.53 && phaseFraction < 0.72) name = 'Waning Gibbous';
  else if (phaseFraction >= 0.72 && phaseFraction < 0.78) name = 'Last Quarter';
  else if (phaseFraction >= 0.78) name = 'Waning Crescent';

  return {
    name,
    cyclePercent: phaseFraction * 100,
    illumination,
    waxing: phaseFraction < 0.5
  };
}

export default function MoonPhaseCard({ now }) {
  const moon = getMoonData(now);
  const shadowOffset = moon.illumination * 28;

  return (
    <div className="w-full max-w-[17rem] rounded-[1.6rem] border border-white/10 bg-[#111111] px-6 py-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]">
      <div className="flex items-center gap-5">
        <div className="relative h-14 w-14 overflow-hidden rounded-full bg-[#f4eed8] shadow-[0_0_18px_rgba(244,238,216,0.18)]">
          <div
            className="absolute inset-0 rounded-full bg-[#121212]"
            style={{ transform: `translateX(${moon.waxing ? -shadowOffset : shadowOffset}px)` }}
          />
        </div>

        <div className="min-w-0">
          <p className="font-mono text-base uppercase tracking-[0.22em] text-white/90">{moon.name}</p>
          <p className="mt-1 font-mono text-xs uppercase tracking-[0.22em] text-white/35">{moon.cyclePercent.toFixed(1)}% cycle</p>
        </div>
      </div>
    </div>
  );
}