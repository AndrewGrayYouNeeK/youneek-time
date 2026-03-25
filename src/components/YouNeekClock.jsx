import { useEffect, useState } from 'react';
import { getDecimalTime } from '@/lib/decimalTime';
import ClockHeader from '@/components/younEEK/ClockHeader';
import DigitalTimeDisplay from '@/components/younEEK/DigitalTimeDisplay';
import ClockDial from '@/components/younEEK/ClockDial';
import DayProgressBar from '@/components/younEEK/DayProgressBar';
import MoonPhaseCard from '@/components/younEEK/MoonPhaseCard';

export default function YouNeekClock() {
  const [now, setNow] = useState(() => new Date());
  const time = getDecimalTime(now);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(new Date());
    }, 16);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[36rem] flex-col items-center gap-8 px-4 py-8 sm:gap-9 sm:py-10">
      <ClockHeader now={now} />
      <DigitalTimeDisplay time={time} />
      <ClockDial time={time} />
      <DayProgressBar time={time} />
      <MoonPhaseCard now={now} />
    </div>
  );
}