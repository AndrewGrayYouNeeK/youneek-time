import { motion } from 'framer-motion';
import ClockLabels from './ClockLabels';
import '@/styles/clock.css';

export default function ClockDial({ time }) {
  const generateTicks = () => {
    const ticks = [];
    for (let i = 0; i < 72; i++) {
      const rotation = (i * 5);
      ticks.push(
        <div key={i} className="tick" style={{ transform: `rotate(${rotation}deg)` }} />
      );
    }
    return ticks;
  };

  return (
    <motion.div
      animate={{ scale: [1, 1.01, 1.018, 1.008, 1] }}
      transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      className="relative aspect-square w-full max-w-[32rem]"
    >
      <div className="clock">
        {generateTicks()}
        <div className="hand units" style={{ transform: `rotate(${time.unitRotation}deg)` }} />
        <div className="hand minutes" style={{ transform: `rotate(${time.minuteRotation}deg)` }} />
        <div className="center-dot" />
        <ClockLabels />
      </div>
    </motion.div>
  );
}