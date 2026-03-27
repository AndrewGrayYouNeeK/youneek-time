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
      <div className="absolute inset-0 rounded-full border border-emerald-200/20 bg-[#050505]" />
      <div className="absolute inset-[9.5%] rounded-full border border-red-400/35" />
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