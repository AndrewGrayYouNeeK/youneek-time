import { motion } from 'framer-motion';
import ClockTicks from './ClockTicks';
import ClockLabels from './ClockLabels';
import ClockHands from './ClockHands';

// centerImage: pass a URL when ready, currently null = shows nothing
const CENTER_IMAGE = null;

export default function ClockDial({ time }) {
  return (
    <motion.div
      animate={{ scale: [1, 1.018, 1] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      className="relative aspect-square w-full max-w-[32rem]"
    >
      {/* Clock face — pure black */}
      <div className="absolute inset-0 rounded-full border border-[#39ff14]/15 bg-black" />

      {/* Center image — fades in/out with the breathing animation */}
      {CENTER_IMAGE && (
        <motion.div
          animate={{ opacity: [0.55, 0.1, 0.55] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-[25%] rounded-full overflow-hidden z-10"
          style={{ pointerEvents: 'none' }}
        >
          <img src={CENTER_IMAGE} alt="center" className="w-full h-full object-cover opacity-70" />
        </motion.div>
      )}

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
