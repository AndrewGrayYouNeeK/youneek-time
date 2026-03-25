import { useEffect, useState } from 'react';
import ClockDial from '@/components/younEEK/ClockDial';
import { getDecimalTime } from '@/lib/decimalTime';

export default function YouNeekClock() {
  const [time, setTime] = useState(() => getDecimalTime());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTime(getDecimalTime());
    }, 50);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined' || !navigator.vibrate) {
      return;
    }

    if (!window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    let echoTimeout;
    const heartbeat = () => {
      navigator.vibrate(22);
      echoTimeout = window.setTimeout(() => {
        navigator.vibrate(38);
      }, 140);
    };

    heartbeat();
    const intervalId = window.setInterval(heartbeat, 1200);

    return () => {
      window.clearInterval(intervalId);
      if (echoTimeout) {
        window.clearTimeout(echoTimeout);
      }
    };
  }, []);

  return (
    <div className="flex w-full flex-col items-center gap-8 px-4 py-4">
      <ClockDial time={time} />
      <div className="flex flex-wrap items-center justify-center gap-3 text-center text-[10px] uppercase tracking-[0.35em] text-white/45 sm:text-xs">
        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">breathing glow</span>
        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">heartbeat haptics</span>
        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">100 glowing ticks</span>
      </div>
    </div>
  );
}