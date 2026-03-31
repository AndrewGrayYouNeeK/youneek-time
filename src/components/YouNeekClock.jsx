import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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

  const GlitchElement = ({ children, delay }) => (
    <motion.div
      animate={isGlitching ? {
        x: [0, Math.random() * 8 - 4, Math.random() * 8 - 4, 0],
        y: [0, Math.random() * 8 - 4, Math.random() * 8 - 4, 0],
        opacity: [1, Math.random() * 0.3 + 0.5, Math.random() * 0.3 + 0.5, 1],
        scale: [1, 1 + Math.random() * 0.1, 1 + Math.random() * 0.1, 1],
      } : {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 5,
        delay,
        times: [0, 0.2, 0.8, 1],
      }}
    >
      {children}
    </motion.div>
  );

  const handleTestGlitch = () => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 5000);
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[36rem] flex-col items-center gap-8 px-4 py-8 sm:gap-9 sm:py-10 bg-black" onClick={handleTestGlitch}>
      <GlitchElement delay={0}>
        <ClockHeader now={now} time={time} />
      </GlitchElement>
      <GlitchElement delay={Math.random() * 0.3}>
        <DigitalTimeDisplay time={time} />
      </GlitchElement>
      <GlitchElement delay={Math.random() * 0.3}>
        <ClockDial time={time} />
      </GlitchElement>
      <GlitchElement delay={Math.random() * 0.3}>
        <DayProgressBar time={time} />
      </GlitchElement>
      <GlitchElement delay={Math.random() * 0.3}>
        <LiveMoonPhaseCard />
      </GlitchElement>
      <GlitchElement delay={Math.random() * 0.3}>
        <AboutSection />
      </GlitchElement>
    </div>
  );
}