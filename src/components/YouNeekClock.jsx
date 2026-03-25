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

    const heartbeat = () => navigator.vibrate([24, 90, 42]);
    heartbeat();

    const intervalId = window.setInterval(heartbeat, 3200);
    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4 py-8">
      <div className="flex flex-col items-center gap-8">
        <ClockDial progress={time.progress} display={time.display} />
        <p className="text-center text-xs uppercase tracking-[0.45em] text-white/45 sm:text-sm">
          breathing light · heartbeat pulse
        </p>
      </div>
    </div>
  );
}