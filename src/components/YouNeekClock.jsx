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
  const [lastUnit, setLastUnit] = useState(time.units);

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 16);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const newUnit = Math.floor(time.units);
    if (newUnit !== lastUnit) {
      setLastUnit(newUnit);
      setIsGlitching(true);
      const glitchTimer = setTimeout(() => setIsGlitching(false), 5000);
      return () => clearTimeout(glitchTimer);
    }
  }, [time.units, lastUnit]);

  useEffect(() => {
    if (isGlitching && navigator.vibrate) {
      navigator.vibrate([100, 50, 100, 300]);
    }
  }, [isGlitching]);

  const testHeartbeat = () => {
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100, 300]);
    }
  };

  const testGlitch = () => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 5000);
  };

  return (
    <div className={`mx-auto flex min-h-screen w-full max-w-[36rem] flex-col items-center gap-8 px-4 py-8 sm:gap-9 sm:py-10 transition-colors duration-100 ${isGlitching ? 'bg-black' : 'bg-black'}`} onClick={testGlitch}>
      <div className={`w-full transition-opacity duration-100 ${isGlitching ? 'opacity-0' : ''}`}>
        <ClockHeader now={now} time={time} />
      </div>
      <div className={`w-full transition-opacity duration-100 ${isGlitching ? 'opacity-0' : ''}`}>
        <DigitalTimeDisplay time={time} />
      </div>
      <div className={`w-full ${isGlitching ? 'animate-glitch' : ''}`}>
        <ClockDial time={time} />
      </div>
      <div className={`w-full transition-opacity duration-100 ${isGlitching ? 'opacity-0' : ''}`}>
        <DayProgressBar time={time} />
      </div>
      <div className={`w-full transition-opacity duration-100 ${isGlitching ? 'opacity-0' : ''}`}>
        <LiveMoonPhaseCard />
      </div>
      <div className={`w-full transition-opacity duration-100 ${isGlitching ? 'opacity-0' : ''}`}>
        <AboutSection />
      </div>
    </div>
  );
}