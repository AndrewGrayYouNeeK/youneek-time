import { useEffect, useState } from 'react';
import ClockDial from '@/components/younEEK/ClockDial';
import { getDecimalTime } from '@/lib/decimalTime';

export default function LockScreenWidget() {
  const [time, setTime] = useState(() => getDecimalTime());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTime(getDecimalTime());
    }, 100);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full max-w-sm rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-[0_0_50px_rgba(34,211,238,0.08)] backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <ClockDial progress={time.progress} display={time.display} compact />
        <div className="min-w-0 flex-1">
          <p className="text-[10px] uppercase tracking-[0.35em] text-white/45">
            lock screen widget
          </p>
          <p className="mt-2 text-3xl font-light tracking-[0.18em] text-white">
            {time.display}
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.28em] text-white/35">
            100 glowing ticks
          </p>
        </div>
      </div>
    </div>
  );
}