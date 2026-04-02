import { motion } from 'framer-motion';
import ClockTicks from './ClockTicks';
import ClockLabels from './ClockLabels';
import ClockHands from './ClockHands';

// centerImage: pass a URL when ready, currently null = shows nothing
const CENTER_IMAGE = 'https://media.base44.com/images/public/69c46a76857b7906981251c6/1f25e836d_IMG_0681.png';

export default function ClockDial({ time }) {
  return (
    <motion.div
      animate={{ scale: [1, 1.018, 1] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      className="relative aspect-square w-full max-w-[32rem]"
    >
      {/* Clock face — transparent to let stars show through */}
      <div className="absolute inset-0 rounded-full border border-[#39ff14]/15 bg-transparent" />

      {/* Center image — darkens when clock shrinks, brightens when it expands */}
      {CENTER_IMAGE && (
        <motion.div
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-[12%] rounded-full overflow-hidden z-10"
          style={{ pointerEvents: 'none' }}
        >
          <img src={CENTER_IMAGE} alt="center" className="w-full h-full object-cover" style={{ opacity: 0.7, transition: 'opacity 0.05s' }} />
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