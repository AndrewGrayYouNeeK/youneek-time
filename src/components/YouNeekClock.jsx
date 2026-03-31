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
  const [lastHour, setLastHour] = useState(now.getHours());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 16);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const currentHour = now.getHours();
    if (currentHour !== lastHour) {
      setLastHour(currentHour);
      setIsGlitching(true);
      const glitchTimer = setTimeout(() => setIsGlitching(false), 2000);
      return () => clearTimeout(glitchTimer);
    }
  }, [now, lastHour]);

  useEffect(() => {
    if (isGlitching && navigator.vibrate) {
      navigator.vibrate([100, 50, 100, 300, 50, 100, 200]);
    }
  }, [isGlitching]);

  const handleTestGlitch = () => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 2000);
  };

  return (
    <div className={`mx-auto flex min-h-screen w-full max-w-[36rem] flex-col items-center gap-8 px-4 py-8 sm:gap-9 sm:py-10 transition-colors duration-100 ${isGlitching ? 'bg-black' : 'bg-transparent'}`}>
      <div className={`w-full transition-opacity duration-100 ${isGlitching ? 'opacity-0' : ''}`}>
        <ClockHeader now={now} time={time} />
      </div>
      <div className={`w-full transition-opacity duration-100 ${isGlitching ? 'opacity-0' : ''}`}>
        <DigitalTimeDisplay time={time} />
      </div>
      <div className={`w-full ${isGlitching ? 'animate-glitch' : ''}`}>
        <ClockDial time={time} isGlitching={isGlitching} />
      </div>
      
      <div className="flex justify-center w-full">
        <button 
          onClick={handleTestGlitch} 
          className="px-6 py-3 text-xs uppercase tracking-widest text-[#39ff14]/70 hover:text-[#39ff14] border border-[#39ff14]/20 hover:border-[#39ff14]/50 rounded-full transition-all bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(57,255,20,0.1)] hover:shadow-[0_0_20px_rgba(57,255,20,0.2)]"
        >
          Test Burnout Effect
        </button>
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