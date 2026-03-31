import { useEffect, useState } from 'react';
import { getDecimalTime } from '@/lib/decimalTime';
import ClockHeader from '@/components/younEEK/ClockHeader';
import DigitalTimeDisplay from '@/components/younEEK/DigitalTimeDisplay';
import ClockDial from '@/components/younEEK/ClockDial';
import DayProgressBar from '@/components/younEEK/DayProgressBar';
import LiveMoonPhaseCard from '@/components/younEEK/LiveMoonPhaseCard';
import AboutSection from '@/components/younEEK/AboutSection';

export default function YouNeekClock() {
  const [now, setNow] = useState(() => new Date());
  const time = getDecimalTime(now);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 16);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const checkHour = () => {
      const currentMinute = new Date().getMinutes();
      const currentSecond = new Date().getSeconds();
      setIsGlitching(currentMinute === 0 && currentSecond < 5);
    };
    checkHour();
    const id = window.setInterval(checkHour, 1000);
    return () => window.clearInterval(id);
  }, []);

  const testVibrate = () => {
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200]);
    }
  };

  return (
    <div className={`mx-auto flex min-h-screen w-full max-w-[36rem] flex-col items-center gap-8 px-4 py-8 sm:gap-9 sm:py-10 transition-colors duration-100 ${isGlitching ? 'bg-black' : 'bg-black'}`} onClick={testVibrate}>
      <div className={`w-full ${isGlitching ? 'hidden' : ''}`}>
        <ClockHeader now={now} time={time} />
      </div>
      <div className={`w-full ${isGlitching ? 'hidden' : ''}`}>
        <DigitalTimeDisplay time={time} />
      </div>
      <div className={`w-full ${isGlitching ? 'animate-glitch' : ''}`}>
        <ClockDial time={time} />
      </div>
      <div className={`w-full ${isGlitching ? 'hidden' : ''}`}>
        <DayProgressBar time={time} />
      </div>
      <div className={`w-full ${isGlitching ? 'hidden' : ''}`}>
        <LiveMoonPhaseCard />
      </div>
      <div className={`w-full ${isGlitching ? 'hidden' : ''}`}>
        <AboutSection />
      </div>
    </div>
  );
}