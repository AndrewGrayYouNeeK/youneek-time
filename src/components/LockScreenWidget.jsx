import { motion } from 'framer-motion';
import ClockDial from '@/components/younEEK/ClockDial';

const SIZE_CONFIG = {
  small: {
    wrapper: 'rounded-[1.7rem] p-3',
    dialWrap: 'w-24',
    title: 'small widget',
    display: 'text-lg',
    meta: 'minimal pulse'
  },
  medium: {
    wrapper: 'rounded-[2rem] p-4',
    dialWrap: 'w-28',
    title: 'medium widget',
    display: 'text-2xl',
    meta: 'lock screen ready'
  },
  large: {
    wrapper: 'rounded-[2.2rem] p-5',
    dialWrap: 'w-32',
    title: 'large widget',
    display: 'text-3xl',
    meta: 'full live preview'
  }
};

export default function LockScreenWidget({ time, size = 'medium' }) {
  const config = SIZE_CONFIG[size] || SIZE_CONFIG.medium;

  return (
    <motion.div
      animate={{ scale: [1, 1.015, 1] }}
      transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
      className={`w-full border border-white/10 bg-white/5 shadow-[0_0_50px_rgba(34,211,238,0.08)] backdrop-blur-xl ${config.wrapper}`}
    >
      <div className="flex items-center gap-4">
        <div className={config.dialWrap}>
          <ClockDial time={time} compact />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] uppercase tracking-[0.35em] text-white/45">{config.title}</p>
          <p className={`mt-2 font-light tracking-[0.18em] text-white ${config.display}`}>{time.display}</p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.28em] text-white/35">{time.dayPercent}% of day</p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.28em] text-cyan-100/45">{config.meta}</p>
        </div>
      </div>
    </motion.div>
  );
}