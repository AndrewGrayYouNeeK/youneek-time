import { useEffect, useState } from 'react';
import LockScreenWidget from '@/components/LockScreenWidget';
import { getDecimalTime } from '@/lib/decimalTime';

export default function WidgetShowcase() {
  const [now, setNow] = useState(() => new Date());
  const [time, setTime] = useState(() => getDecimalTime(now));
  const [isGlitching, setIsGlitching] = useState(false);
  const [lastHour, setLastHour] = useState(now.getHours());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      const currentNow = new Date();
      setNow(currentNow);
      setTime(getDecimalTime(currentNow));
    }, 100);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const currentHour = now.getHours();
    if (currentHour !== lastHour) {
      setLastHour(currentHour);
      setIsGlitching(true);
      const glitchTimer = setTimeout(() => setIsGlitching(false), 1200);
      return () => clearTimeout(glitchTimer);
    }
  }, [now, lastHour]);

  const handleTestGlitch = () => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 1200);
  };

  return (
    <div className={`mx-auto flex w-full max-w-5xl flex-col items-center gap-8 ${isGlitching ? 'animate-glitch' : ''}`}>
      <div className={`text-center transition-opacity duration-100 ${isGlitching ? 'opacity-0' : ''}`}>
        <p className="text-xs uppercase tracking-[0.45em] text-white/40">Widget preview</p>
        <h2 className="mt-3 text-3xl font-light tracking-[0.2em] text-white sm:text-4xl">Lock screen set</h2>
        <p className="mt-3 text-sm text-white/55">Three live widget sizes inside a glassy iPhone-style preview.</p>
      </div>

      <div className="relative w-full max-w-[23rem] rounded-[3rem] border border-white/10 bg-black/75 p-3 shadow-[0_20px_80px_rgba(34,211,238,0.12)] backdrop-blur-xl">
        <div className="absolute left-1/2 top-3 h-6 w-32 -translate-x-1/2 rounded-full bg-black/90" />
        <div className="rounded-[2.5rem] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),rgba(0,0,0,0.92)_58%)] px-4 pb-5 pt-12">
          <div className="mb-4 flex items-center justify-between px-1 text-[10px] uppercase tracking-[0.35em] text-white/45">
            <span>YNK</span>
            <span>{time.display}</span>
          </div>

          <div className="space-y-3">
            <LockScreenWidget size="large" time={time} isGlitching={isGlitching} />
            <div className="grid grid-cols-2 gap-3">
              <LockScreenWidget size="medium" time={time} isGlitching={isGlitching} />
              <LockScreenWidget size="small" time={time} isGlitching={isGlitching} />
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={handleTestGlitch} 
        className="mt-4 px-4 py-2 text-xs uppercase tracking-widest text-white/30 hover:text-white/70 border border-white/10 rounded-full transition-colors"
      >
        Test Burnout Effect
      </button>
    </div>
  );
}