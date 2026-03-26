import { motion } from 'framer-motion';
import ClockTicks from './ClockTicks';
import ClockLabels from './ClockLabels';
import ClockHands from './ClockHands';

export default function ClockDial({ time }) {
  return (
    <motion.div
      animate={{ scale: [1, 1.028, 1, 1.055, 1] }}
      transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      className="relative aspect-square w-full max-w-[32rem]"
    >
      <div className="absolute inset-[-6%] rounded-full bg-emerald-300/20 blur-[80px]" />
      <div className="absolute inset-[-2%] rounded-full bg-red-400/10 blur-[44px]" />
      <div className="absolute inset-0 rounded-full border border-emerald-200/20 bg-[#050505] shadow-[0_0_70px_rgba(74,222,128,0.22),0_0_24px_rgba(248,113,113,0.16),0_0_80px_rgba(0,0,0,0.8)]" />
      <div className="absolute inset-[2.5%] rounded-full border border-emerald-300/35 shadow-[inset_0_0_24px_rgba(134,239,172,0.12)]" />
      <div className="absolute inset-[11.5%] rounded-full border border-red-400/35 shadow-[0_0_26px_rgba(248,113,113,0.18)]" />
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