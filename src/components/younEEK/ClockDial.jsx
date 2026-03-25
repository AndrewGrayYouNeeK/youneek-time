import { motion } from 'framer-motion';
import ClockTicks from './ClockTicks';
import ClockLabels from './ClockLabels';
import ClockHands from './ClockHands';

export default function ClockDial({ time }) {
  return (
    <motion.div
      animate={{ scale: [1, 1.01, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className="relative aspect-square w-full max-w-[26rem]"
    >
      <div className="absolute inset-0 rounded-full bg-emerald-300/[0.03] blur-3xl" />
      <div className="absolute inset-0 rounded-full border border-white/10 bg-[#060606] shadow-[0_0_40px_rgba(0,0,0,0.65)]" />
      <div className="absolute inset-[3%] rounded-full border border-white/12" />
      <div className="absolute inset-[12%] rounded-full border border-red-400/15" />
      <div className="absolute inset-[16%] rounded-full border border-white/5" />
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