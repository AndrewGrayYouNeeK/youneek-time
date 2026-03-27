import { motion } from 'framer-motion';
import ClockTicks from './ClockTicks';
import ClockLabels from './ClockLabels';
import ClockHands from './ClockHands';

export default function ClockDial({ time }) {
  return (
    <motion.div
      animate={{ scale: [1, 1.01, 1.018, 1.008, 1] }}
      transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      className="relative aspect-square w-full max-w-[32rem]"
    >
      <div className="absolute inset-0 rounded-full border border-[#6EF695]/20 bg-[#040404] shadow-[0_0_20px_rgba(110,246,149,0.12)]" />
      <div className="absolute inset-[2.5%] rounded-full border border-[#6EF695]/30" />
      <div className="absolute inset-[11.5%] rounded-full border border-red-500/30" />
      <div className="absolute inset-[15.5%] rounded-full border border-white/8" />
      <ClockTicks />
      <ClockLabels />
      <ClockHands
        unitRotation={time.unitRotation}
        minuteRotation={time.minuteRotation}
        secondRotation={time.secondRotation}
      />
    </motion.div>
  );
}