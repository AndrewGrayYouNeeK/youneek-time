import { useEffect, useState } from 'react';
import LockScreenWidget from '@/components/LockScreenWidget';
import { getDecimalTime } from '@/lib/decimalTime';

export default function WidgetShowcase() {
  const [time, setTime] = useState(() => getDecimalTime());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTime(getDecimalTime());
    }, 100);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8">
      <div className="text-center">
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
            <LockScreenWidget size="large" time={time} />
            <div className="grid grid-cols-2 gap-3">
              <LockScreenWidget size="medium" time={time} />
              <LockScreenWidget size="small" time={time} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}